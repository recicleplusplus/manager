import { signInWithEmailAndPassword, onAuthStateChanged, updateEmail, updatePassword, createUserWithEmailAndPassword } from "firebase/auth";
import { setCookies, hasCookies, deleteCookies } from './cookies';
import { collection, getDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { Auth, Firestore, RealTime, Storage, getNewAuth } from "../config/firebase";
import { ref, set, onValue, remove } from "firebase/database";
import { uploadBytes, ref as refStorage, getDownloadURL } from "firebase/storage";
import { defaultUser } from "../contexts/userContext";
import VerifyErroCode from '../config/firebaseErrors';

const firestoreRef = collection(Firestore, 'manager');

function RegisterUser(data, callback) {
    const newAuth = getNewAuth();
    createUserWithEmailAndPassword(newAuth, data.email, "12345678").then((user) => {
        setDoc(doc(firestoreRef, user.user.uid), {
            name: data.name,
            email: data.email,
            cpf: data.cpf,
        }).then(() => {
            remove(ref(RealTime, `manager/requests/${data.id}`)).then(() => {
                callback(200, "Administrador cadastrado com sucesso");
            }).catch((error) => {
                callback(error.code, VerifyErroCode(error.code));
            });                
        });
    }).catch((error) => {
        callback(error.code, VerifyErroCode(error.code));
    });
}

function RemoveUserRequest(id, callback) {
    remove(ref(RealTime, `manager/requests/${id}`)).then(() => {
        callback(200, "Cadastro de administrador negado");
    }).catch((error) => {
        callback(error.code, VerifyErroCode(error.code));
    });   
}

function SignIn(email, password, setUserData, callback) {
    signInWithEmailAndPassword(Auth, email, password).then((user) => {
        registerDataContext(user.user, setUserData, callback);
    }).catch((error) => {
        callback(error.code, VerifyErroCode(error.code));
    });
}

function SignOut(callback) {
    Auth.signOut().then(() => {
        deleteCookies("token"); 
        callback(200, "SignOut");
    }).catch((error) => {
        callback(error.code, VerifyErroCode(error.code));
    });
}

function RequestSignIn(name, cpf, email, callback) {
    set(ref(RealTime, `manager/requests/1${cpf.match(/\d+/g)}22`), {
        name: name,
        cpf: cpf,
        email: email
    }).then(() => {
        callback(200, "RequestSignIn");
    }).catch((error) => {
        callback(error.code, VerifyErroCode(error.code));
    });
}

function AuthListener(setUserData, callback) {
    onAuthStateChanged(Auth, (user) => {
        registerDataContext(user, setUserData, callback);
    });
}

function registerDataContext(user, setUserData, callback){
    if (user) {
        getDoc(doc(firestoreRef, user.uid)).then((document) => {
            if (document.exists()) {
                const data = document.data();
                setCookies('token', user.accessToken);
                setUserData({...data, email: user.email, id: user.uid});
                callback(200, "SignIn");
            }else{
                deleteCookies("token"); 
                callback(403, "Usuário não autorizado");
            }
        }).catch((error) => {
            callback(error.code, VerifyErroCode(error.code));
        });
    } else {
        if(hasCookies("token")){
            deleteCookies("token"); 
            setUserData(defaultUser);
        }
        callback(200, "SignOut");
    }
}

function SendImageFirestore(path, file, callback){
    uploadBytes(refStorage(Storage, path), file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            callback(200, "Imagem enviada com sucesso", url);
        }).catch((error) => {
            callback(error.code, VerifyErroCode(error.code));
        });
    }).catch((error) => {
        callback(error.code, VerifyErroCode(error.code));
    });
}

function UpdatePhotoUrl(id, url, callback){
    updateDoc(doc(firestoreRef, id), {
        photoUrl: url
    }).then(() => {
        callback(200, "Referência de foto atualizada com sucesso", "");
    }).catch((error) => {
        callback(error.code, VerifyErroCode(error.code));
    });
}

function UpdateName(id, name, callback){
    updateDoc(doc(firestoreRef, id), {
        name: name
    }).then(() => {
        callback(200, "Referência de foto atualizada com sucesso", "");
    }).catch((error) => {
        callback(error.code, VerifyErroCode(error.code));
    });
}

function UpdateEmail(id, email, callback){
    updateEmail(Auth.currentUser, email).then(() => {
        updateDoc(doc(firestoreRef, id), {
            email: email
        }).then(() => {
            callback(200, "Email atualizado com sucesso", "");
        }).catch((error) => {
            callback(error.code, VerifyErroCode(error.code));
        });
    }).catch((error) => {
        callback(error.code, VerifyErroCode(error.code));
    });
}
function UpdatePassword(password, callback){
    updatePassword(Auth.currentUser, password).then(() => {
        callback(200, "Senha atualizada com sucesso", "");
    }).catch((error) => {
        callback(error.code, VerifyErroCode(error.code));
    });
}

function GetUsersRequests(callback){
    return onValue(ref(RealTime, 'manager/requests'), (snapshot) => {
        if(!snapshot.exists()) return callback([]);
        const data = [];
        Object.keys(snapshot.val()).forEach((key) => {
            data.push({
                id: key,
                ...snapshot.val()[key]
            })
        });
        callback(data);
    });
}



export {
    SignIn, 
    SignOut, 
    AuthListener, 
    RequestSignIn, 
    SendImageFirestore, 
    UpdatePhotoUrl, 
    UpdateName, 
    UpdateEmail, 
    UpdatePassword, 
    GetUsersRequests,
    RegisterUser,
    RemoveUserRequest
};