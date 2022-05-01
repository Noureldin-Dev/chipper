import React, { useEffect, useState } from 'react'
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import Dashboard from '../components/Dashboard';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from '../firebase';
import LoadingScreen from '../components/LoadingScreen';
import Head from 'next/head';




function app() {
    const checkUserinDB = async (user) => {
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {

        } else {
            await setDoc(doc(db, "users", user.email), {
                Name:user.displayName,
                Email: user.email,
            });
        }
    }
    const router = useRouter()
const [LoggedInObject, setLoggedInObject] = useState(null)



useEffect(()=>{

  onAuthStateChanged(auth, (user) => {
    if (user) {

    console.log("user logged in")
    // console.log(user.email)
//check if user is in the db

checkUserinDB(user)

    setLoggedInObject(user)

      const uid = user.uid;
      // ...
    } else {

        console.log("user logged out")
      // User is signed out
      router.push("/")
      // ...
    }
  });

},[])



  return (
<>
<Head>
<title>Home / Chipper</title>
</Head>
<Dashboard/>
</>
  )
}

export default app