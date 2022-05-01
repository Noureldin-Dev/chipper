import React, { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { auth,username } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import SideBar from '../components/SideBar';
import LoadingScreen from '../components/LoadingScreen';
import myContext from '../components/myContext';
import { useContext } from 'react';
import Feed from '../components/Feed';
import { onSnapshot } from "firebase/firestore";
import { useRouter } from 'next/router';
import { doc, setDoc, getDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore"; 
import { db } from '../firebase';




function explore() {
  const router = useRouter()

    const user = auth.currentUser
const [LoggedIn, setLoggedIn] = useState(null)
const [username1, setusername] = useState("")

const {UsernameAndEmailChecker, setUsernameAndEmailChecker} = useContext(myContext);


useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          setLoggedIn(user)
          // ...
        } else {
          // User is signed out
router.push("/")
          // ...
        }
      });

    },[])





    useEffect(async()=>{
if(!LoggedIn){
    return
}


const unsub = onSnapshot(doc(db, "users", user.email), (doc) => {
    // console.log("Current data: ", doc.data());
    setusername(doc.data().username1)
});



    },[LoggedIn])
  return (
    <div className='fullScreenDiv'>
      <SideBar currentScreen="Explore" PhotoURL={user?.photoURL} username={UsernameAndEmailChecker[0]} user={user}/>
    {LoggedIn !== null?
    <>
    {/* <Feed PhotoURL={LoggedIn.photoURL} username= {UsernameAndEmailChecker[0]} user={LoggedIn} isBookmark={true} desiredexplore={Fetchedexplore}/> */}
<div style={{flex:1}}></div>
</>
    :<LoadingScreen/>}

      </div>
  )
}

export default explore