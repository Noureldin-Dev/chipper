import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { GoogleAuthProvider } from "firebase/auth";


const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

const firebaseConfig = {
  
  apiKey: "AIzaSyDO-XwjL5b28tSfw8NZlGPj1y3HjrvsArg",

  authDomain: "messagingapp-53c46.firebaseapp.com",

  projectId: "messagingapp-53c46",

  storageBucket: "messagingapp-53c46.appspot.com",

  messagingSenderId: "1090898898267",

  appId: "1:1090898898267:web:17f0201af866895cbe7e7e",

  measurementId: "G-FWE9X7BZPF"

};

  

const app = initializeApp(firebaseConfig);


//sign up new users
const auth = getAuth();



const db = getFirestore();





export {app, auth, db, provider}