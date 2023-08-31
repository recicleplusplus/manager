import { getNewAuth, Firestore } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {DesactivateUser, ActivateUser} from '../config/firebaseServer';
import { setDoc, doc, collection, query, where, onSnapshot } from "firebase/firestore";
import VerifyErroCode from '../config/firebaseErrors';

const firestoreRef = collection(Firestore, 'collector');

function RegisterCollector(data, adm, callback){
    const Auth = getNewAuth();
    createUserWithEmailAndPassword(Auth, data.email, '12345678').then((user) => {
        Auth.signOut();
        setDoc(doc(firestoreRef, user.user.uid), {
            name: data.name,
            email: data.email,
            cpf: data.cpf,
            phone: data.phone,
            prize: 0,
            photoUrl: '',
            address: [],
            notificarions: [],
            status: true,
            statistic: {
                collectionsCompleted: 0,
                eletronicKg: 0,
                glassKg: 0,
                metalKg: 0,
                oilKg: 0,
                paperKg: 0,
                plasticKg: 0
            },
            createdBy: {
                id: adm.id,
                name: adm.name,
                email: adm.email
            }
        }).then(() => {
            callback(200, "Coletor cadastrado com sucesso");
        }).catch((error) => {
            callback(error.code, VerifyErroCode(error.code));
        });
    }).catch((error) => {
        callback(error.code, VerifyErroCode(error.code));
    });
}

function AssignCollector(status, callback){
    return onSnapshot(query(firestoreRef, where('status', '==', status)), (snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
            data.push({
                id: doc.id,
                name: doc.data().name,
                email: doc.data().email,
                cpf: doc.data().cpf,
                phone: doc.data().phone,
                photoUrl: doc.data().photoUrl,
                address: doc.data().address,
                statistic: doc.data().statistic,
                createdBy: doc.data().createdBy
            });
        });
        callback(data);
    });
}

function DesactivateCollector(id, callback){
    setDoc(doc(firestoreRef, id), {
        status: false
    }, { merge: true }).then(() => {
        DesactivateUser(id).then(() => {
            callback(200, "Coletor desativado com sucesso");
        }).catch((error) => {
            callback(error.code, VerifyErroCode(error.code));
        });

    }).catch((error) => {
        callback(error.code, VerifyErroCode(error.code));
    });
}

function ActivateCollector(id, callback){
    setDoc(doc(firestoreRef, id), {
        status: true
    }, { merge: true }).then(() => {
        ActivateUser(id).then(() => {
            callback(200, "Coletor ativado com sucesso");
        }).catch((error) => {
            callback(error.code, VerifyErroCode(error.code));
        });
    }).catch((error) => {
        callback(error.code, VerifyErroCode(error.code));
    });
}



export { RegisterCollector, AssignCollector, DesactivateCollector, ActivateCollector };