import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// ====================================================================
// Coloque firebaseConfig Gerado abaixo (ContaClient)
const firebaseConfig = {
  apiKey: "AIzaSyD43_ayIA-4EkAmurNRlUI3NV_RTfTRE60",
  authDomain: "reciclaplusnew.firebaseapp.com",
  databaseURL: "https://reciclaplusnew-default-rtdb.firebaseio.com",
  projectId: "reciclaplusnew",
  storageBucket: "reciclaplusnew.appspot.com",
  messagingSenderId: "834087762330",
  appId: "1:834087762330:web:03f2138839f1545bafe223",
  measurementId: "G-6HQN1N70Z5"
};
// Coloque firebaseConfig Gerado acima
// ====================================================================

const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);
const Firestore = getFirestore(app);
const RealTime = getDatabase(app);
const Storage = getStorage(app);

function getNewAuth(){
  return getAuth(initializeApp(firebaseConfig, "app2"));
}

export {Auth, Firestore, RealTime, Storage, getNewAuth};