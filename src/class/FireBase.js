import {initializeApp} from "firebase/app";
import {doc, getDoc, getFirestore, updateDoc} from "firebase/firestore";
import {Component, useEffect, useState} from "react";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"


class FireBase extends Component {
    firebaseConfig = {
        apiKey: "AIzaSyCW5uElcwMCPuUqlGSgEUEvmsCDIDMq-ZI",
        authDomain: "reacttp2.firebaseapp.com",
        projectId: "reacttp2",
        storageBucket: "reacttp2.appspot.com",
        messagingSenderId: "1010325083890",
        appId: "1:1010325083890:web:e53df34be8086c0b27626b",
        measurementId: "G-FSF2LX1YFS"
    };

    constructor() {
        super();
        this.firebaseApp = initializeApp(this.firebaseConfig);
        this.db = getFirestore(this.firebaseApp);
        this.auth = getAuth(this.firebaseApp)

    }


    state = {
        fire: null,
    };


    async readData() {
        try {
            const usersInfoRef = doc(this.db, 'Usersinfo', 'user');

            const userInfo = await getDoc(usersInfoRef);
            if (userInfo.exists) {
                console.log(userInfo.data())
                const nameUser = userInfo.data().nom;
                //console.log('nameuser = ');
                //  console.log(nameUser);

                this.state.fire = nameUser;
                //console.log("state = " + this.state.fire)
                return this.state.fire

            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.log('Error getting document:', error);
        }
    }

    async UpdateFavoris() {
        const favRef = doc(this.db, "Usersinfo", "user")
        await updateDoc(favRef, {
            favoris: [112, 15, 1]
        })
    }

    ConnexionFireBase(email, password) {
        return new Promise((resolve, reject) => {
            if (email != null && password != null) {
                signInWithEmailAndPassword(this.auth, email, password)
                    .then((userCredential) => {
                        console.log("CONECTER");
                        console.log(userCredential.user)
                        resolve(true);
                    })
                    .catch((error) => {
                        let errorCode = error.code;
                        let errorMessage = error.message;
                        console.log("erreur code fireAuth = " + errorCode)
                        console.log("erreur message fireAuth = " + errorMessage)
                        reject(false);
                    })
            }
        });
    }

    InscriptionFireBase(nom, email, password) {
        return new Promise((resolve, reject) => {
            if (nom != null && email != null && password != null) {
                createUserWithEmailAndPassword(this.auth, email, password)
                    .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        console.log("user créer" + user)
                        resolve(true);

                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        alert("error code = " + errorCode + "|" +
                            "error message = "+errorMessage)
                        reject(false)
                    })
            }
        })
    }


}


export default FireBase