'use server';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';

const serviceAccount = require("./server.json");


// ====================================================================
// Coloque as Configurações do servidor aqui abaixo (SERVER)
const server = {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://reciclaplusnew-default-rtdb.firebaseio.com"
};
// // Coloque as Configurações do servidor aqui acima (SERVER)
// ====================================================================


const app = initializeApp(server);
const AuthServer = getAuth(app);

async function DesactivateUser(id) {
    try {
        await AuthServer.updateUser(id, {
            disabled: true
        });
    } catch (error) {
        throw error;
    }
}

async function ActivateUser(id) {
    try {
        await AuthServer.updateUser(id, {
            disabled: false
        });
    } catch (error) {
        throw error;
    }
}

export {DesactivateUser, ActivateUser};