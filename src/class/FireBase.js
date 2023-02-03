import {initializeApp} from "firebase/app";
import {doc, getDoc, getFirestore, updateDoc, setDoc} from "firebase/firestore";
import {Component, useEffect, useState} from "react";
import {
    getAuth, signInWithEmailAndPassword,
    createUserWithEmailAndPassword, onAuthStateChanged, signOut
} from "firebase/auth"


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
        this.chemin = "Usersinfo"
    }


    state = {
        fire: null,
    };

    async CreateDocNewUser(email, nom) {
        await setDoc(doc(this.db, this.chemin, email), {
            favoris: [],
            nom: nom
        })
    }

    async readData(document) {
        try {
            const usersInfoRef = doc(this.db, 'Usersinfo', document)

            const userInfo = await getDoc(usersInfoRef);
            if (userInfo.exists) {
                //console.log(userInfo.data())
                const arrayFavoris = userInfo.data().favoris;
                //console.log('nameuser = ');
                //  console.log(nameUser);

                this.state.fire = arrayFavoris;
                //console.log("state = " + this.state.fire)
                return this.state.fire

            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.log('Error getting document:', error);
        }
    }

    async UpdateFavoris(arrayFavoris, documentName) {
        const favRef = doc(this.db, "Usersinfo", documentName)
        await updateDoc(favRef, {
            favoris: arrayFavoris
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
        if (!nom)
            nom = "Non renseigné"

        return new Promise((resolve, reject) => {
            if (nom != null && email != null && password != null) {
                createUserWithEmailAndPassword(this.auth, email, password)
                    .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        console.log("user créer" + user)
                        this.CreateDocNewUser(email, nom)
                        resolve(true);

                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        alert("error code = " + errorCode + "|" +
                            "error message = " + errorMessage)
                        reject(false)
                    })
            }
        })
    }

    async IsConnected() {
        return new Promise((resolve) => {
            onAuthStateChanged(this.auth, (user) => {
                if (user) {
                    const email = user.email
                    console.log("variable email dans isconnected" + email)
                    resolve(email);
                } else {
                    console.log("pas duser connecter")
                    resolve(false);
                }
            });
        });
    }

    LogOut() {
        signOut(this.auth)
    }

}


export default FireBase