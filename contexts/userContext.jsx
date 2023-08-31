'use client';
import React, {createContext, useState, useEffect} from 'react';
import { AuthListener } from '../services/user';

export const UserContext = createContext();

export const defaultUser = {
    name: '',
    email: '',
    cpf: '',
    phone: '',
    type: '',
    address: {
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
    },
    photoUrl: '',
    id: '',
}

export default function UserProvider({children}) {
    const [user, setUser] = useState(defaultUser);

    function setUserData(data) {setUser({...user, ...data});}
    function setName(name) {setUser({...user, name});}
    function setEmail(email) {setUser({...user, email});}
    function setCpf(cpf) {setUser({...user, cpf});}
    function setPhone(phone) {setUser({...user, phone});}
    function setPhotoUrl(photoUrl) {setUser({...user, photoUrl});}
    function setId(id) {setUser({...user, id});}
    function setType(type) {setUser({...user, type});}
    function setStreet(street) {setUser({...user, address: {...user.address, street}});}
    function setNumber(number) {setUser({...user, address: {...user.address, number}});}
    function setComplement(complement) {setUser({...user, address: {...user.address, complement}});}
    function setNeighborhood(neighborhood) {setUser({...user, address: {...user.address, neighborhood}});}
    function setCity(city) {setUser({...user, address: {...user.address, city}});}
    function setState(state) {setUser({...user, address: {...user.address, state}});}

    useEffect(() => {
        AuthListener(setUserData, (code, message) => {});
    }, []);

    return (
        <UserContext.Provider 
            value={{
                user, 
                setUserData,
                setName,
                setEmail,
                setCpf,
                setPhone,
                setPhotoUrl,
                setId,
                setType,
                setStreet,
                setNumber,
                setComplement,
                setNeighborhood,
                setCity,
                setState,
        }}>
            {children}
        </UserContext.Provider>
    )
}