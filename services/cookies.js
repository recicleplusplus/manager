'use server'
import { cookies } from "next/headers";

async function setCookies(name, value){
    cookies().set({
        name: name,
        value: value,
        httpOnly: true,
    });
}

function deleteCookies(name){
    cookies().delete(name);
}

function hasCookies(name){
    return cookies().has(name);
}

function getCookies(name){
    return cookies().get(name);
}

export {setCookies, hasCookies, deleteCookies, getCookies};
