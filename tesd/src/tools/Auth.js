import React, { useEffect, useState, useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';
import firebase from './../services/firebase'

export const AuthContext = React.createContext();

function useStore(){
    return useContext(MobXProviderContext);
}

export const AuthProvider = ({ children }) => {

    const { store } = useStore();
    const [currentUser, setCurrentUser] = useState(store.auth.infor)
    const [ pending, setPending] = useState(true);

    useEffect(() => {

		firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        }) 
    },[])


    if(pending){
        return <>loading...</>
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            { children}
        </AuthContext.Provider>
    )
}