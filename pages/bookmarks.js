import React, { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { auth,username } from '../firebase';
import { db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import SideBar from '../components/SideBar';
import LoadingScreen from '../components/LoadingScreen';
import myContext from '../components/myContext';
import { useContext } from 'react';
import Feed from '../components/Feed';
import { onSnapshot } from "firebase/firestore";
import { useRouter } from 'next/router';
import SearchSection from '../components/SearchSection';
import { doc, setDoc, getDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore"; 


function bookmarks() {
  const router = useRouter()

    const user = auth.currentUser
const [LoggedIn, setLoggedIn] = useState(null)
const [username1, setusername] = useState("")
const [FetchedBookmarks, setFetchedBookmarks] = useState(null)
const {UsernameAndEmailChecker, setUsernameAndEmailChecker} = useContext(myContext);


useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          setLoggedIn(user)
          const docRef = doc(db, "users", user.email);
const docSnap = await getDoc(docRef);
if (docSnap.data().Bookmarks== undefined){
  setFetchedBookmarks([])
}else{
  setFetchedBookmarks(docSnap.data().Bookmarks)
}
console.log(docSnap.data().Bookmarks)
setusername(docSnap.data().username)
        } else {
          // User is signed out
router.push("/")
          // ...
        }
      });



    },[])



  return (
    <div className='fullScreenDiv'>
      <SideBar currentScreen="Bookmarks" PhotoURL={user?.photoURL} username={UsernameAndEmailChecker[0]} user={user}/>
    {LoggedIn !== null?
    <>
    <Feed PhotoURL={LoggedIn.photoURL} username= {UsernameAndEmailChecker[0]} user={LoggedIn} Screen="Bookmarks" desiredBookmarks={FetchedBookmarks}/>

{/* <div style={{flex:1}}></div> */}
</>
    :<div className='MiddleColumnContainer'>
      <div id='DisplayedPosts'></div>
      </div>}
<SearchSection/>

      </div>
  )
}

export default bookmarks