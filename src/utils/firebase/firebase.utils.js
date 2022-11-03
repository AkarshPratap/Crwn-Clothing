import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCh0Cl3Elb3KoD-wmTz1D9c2kHYOCCQaZk",
    authDomain: "crwn-clothing-8d63b.firebaseapp.com",
    projectId: "crwn-clothing-8d63b",
    storageBucket: "crwn-clothing-8d63b.appspot.com",
    messagingSenderId: "849691001012",
    appId: "1:849691001012:web:a4a01a0de4191d68da17e1"
  };

const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc( db, 'users', userAuth.uid); 


    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error){
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
}