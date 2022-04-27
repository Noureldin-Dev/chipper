
import {ThemeProvider} from "@mui/material"
import React, { useEffect, useState } from "react"
import "../styling/styling.css"
import myContext from "../components/myContext"
import { auth, db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"


 const MyApp = ({ Component, pageProps }) => {

const [UsernameAndEmailChecker, setUsernameAndEmailChecker] = useState([])



useEffect(()=>{
  onAuthStateChanged(auth, async (user) => {
    if (user) {


      const docRef = doc(db, "users", user.email)
      const docSnap = await getDoc(docRef).then((docSnap) => {
        setUsernameAndEmailChecker([docSnap.data().username, user?.email,user?.photoURL])
      })



      const uid = user.uid
      // ...
    } else {

      console.log("user logged out")
      // User is signed out

      // ...
    }
  });
},[])





const value = {UsernameAndEmailChecker, setUsernameAndEmailChecker}



  return (
    <myContext.Provider value={value}>
      
      <Component {...pageProps} />
      </myContext.Provider>
  )
}

export default MyApp