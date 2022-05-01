import React, { useEffect, useRef, useState } from 'react'
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
import { doc, setDoc, getDoc, orderBy, limit } from "firebase/firestore"; 




 const User= () => {

    const user = auth.currentUser
    const router = useRouter()
    const { uid } = router.query;
    const qUsername = uid;
    const [DesiredProfileName, setDesiredProfileName] = useState("")
    const [HaveToLoadMorePosts, setHaveToLoadMorePosts] = useState(false)
    const {UsernameAndEmailChecker, setUsernameAndEmailChecker} = useContext(myContext);


    
const username = UsernameAndEmailChecker[0];

const [LoggedInObject, setLoggedInObject] = useState(null)

const listInnerRef = useRef();
const onScroll = () => {
  if (listInnerRef.current) {
    const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
    if (scrollTop + clientHeight === scrollHeight) {
      console.log("reached bottom");
      // GetMorePosts()
      setHaveToLoadMorePosts(!HaveToLoadMorePosts)

    }
  }
};
useEffect(async()=>{
  if (qUsername == undefined){

    return
  }


  const q = query(collection(db, "users"), where("username", "==", qUsername));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  doc.data().email = doc.id;
  let UserObj = doc.data()
  UserObj.Email = doc.id
setDesiredProfileName(UserObj)


});
},[qUsername])

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
<SideBar currentScreen={qUsername==UsernameAndEmailChecker[0]?"Profile":""}  PhotoURL={user?.photoURL} username={username} user={LoggedInObject}/>

{LoggedInObject==null? <div className='MiddleColumnContainer'>
      <div id='DisplayedPosts'></div>
      </div>:
<>
<div  onScroll={onScroll}
                    ref={listInnerRef} className='MiddleColumnContainer'>

<div style={{display:"flex", flexDirection:"column"}}>
<header  id="FeedHeader">
        <IconButton style={{position:"relative", left:"-10px"}} onClick={() => router.back()}>
          <KeyboardBackspaceIcon/>
        </IconButton>
        <div style={{display:"flex", position:"relative",left:"20px", flexDirection:"column"}}>
        <strong style={{position:"absolute",top:"-5px", width:'500px'}} >{DesiredProfileName.Name}</strong>
        <p style={{fontWeight:"400", fontSize:"13px", color:"#71767B", position:"absolute", top:"1px"}}>{DesiredProfileName.NumberOfPosts == undefined? "":DesiredProfileName.NumberOfPosts+" posts"}</p>
        </div>
        </header>

        <ProfileOverview currentUser={UsernameAndEmailChecker} UserInfo={DesiredProfileName == ""?null:DesiredProfileName} LoggedInObject={LoggedInObject}/>
<Feed username= {UsernameAndEmailChecker[0]} user={LoggedInObject} Screen="Profile" desiredProfile={qUsername} HaveToLoadMorePosts={HaveToLoadMorePosts}/>

</div>


</div>
</>
}

<SearchSection />

</div>
  )
}

export default User