import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from '../../firebase';
import SideBar from '../../components/SideBar';
import { useContext } from 'react';
import myContext from '../../components/myContext';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProfileOverview from "../../components/ProfileOverview"
import SearchSection from '../../components/SearchSection';
import Feed from '../../components/Feed';
import LoadingScreen from '../../components/LoadingScreen';
import {IconButton } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';




 const User= () => {

   const user = auth.currentUser
    const router = useRouter()
    const { uid } = router.query;
    const qUsername = uid;
    const [DesiredProfileName, setDesiredProfileName] = useState("")


    const {UsernameAndEmailChecker, setUsernameAndEmailChecker} = useContext(myContext);

const username = UsernameAndEmailChecker[0];

const [LoggedInObject, setLoggedInObject] = useState(null)



useEffect(()=>{

  onAuthStateChanged(auth, (user) => {
    if (user) {

    console.log("user logged in")
    // console.log(user.email)
//check if user is in the db

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
    <div className='fullScreenDiv'>

{LoggedInObject==null? <></>:
<>
<SideBar currentScreen={qUsername==UsernameAndEmailChecker[0]?"Profile":""}  PhotoURL={user?.photoURL} username={username} user={LoggedInObject}/>
<div className='MiddleColumnContainer'>

<div>
<header  id="FeedHeader">
        <IconButton style={{position:"relative", left:"-10px"}} onClick={() => router.back()}>
          <KeyboardBackspaceIcon/>
        </IconButton>
        <div style={{display:"flex", position:"relative",left:"20px", flexDirection:"column"}}>
        <strong style={{position:"absolute",top:"-5px"}}>{DesiredProfileName.Name}</strong>
        <p style={{fontWeight:"400", fontSize:"13px", color:"#71767B", position:"absolute", top:"1px"}}>{DesiredProfileName.NumberOfPosts == undefined? "0":DesiredProfileName.NumberOfPosts} posts</p>
        </div>
        </header>
        <ProfileOverview setDesiredProfileName={setDesiredProfileName} LoggedInObject={LoggedInObject} username ={qUsername}/>
<Feed username= {UsernameAndEmailChecker[0]} user={LoggedInObject} isProfile={true} desiredProfile={qUsername} />

</div>


</div>
<SearchSection/>
</>
}


</div>
  )
}

export default User