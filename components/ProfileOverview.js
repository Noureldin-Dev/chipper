import React, { useEffect, useState } from 'react'
import PhotoDialog from './PhotoDialog'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { Avatar, Divider, IconButton } from '@mui/material';
import LoadingScreen from './LoadingScreen';
import { useRouter } from 'next/router';
import { doc, updateDoc, arrayUnion, arrayRemove,onSnapshot } from "firebase/firestore";




function ProfileOverview({LoggedInObject,currentUser, UserInfo}) {
  const router = useRouter()

  const [UserFollowsThisProfile, setUserFollowsThisProfile] = useState(false)



useEffect(()=>{
  if (currentUser[1] == undefined || UserInfo == null){
    return
  }

const unsub = onSnapshot(doc(db, "users", currentUser[1]), (doc) => {
  if(UserInfo!== null){
    if (doc.data().Following.includes(UserInfo?.Email)){
      setUserFollowsThisProfile(true)
      console.log(true)
    }else{
      setUserFollowsThisProfile(false)
  
    }
  }else{
    console.log('err')
  }

});

},[currentUser,UserInfo])



  const FollowThisProfile = async () => {

    const userRef = doc(db, "users", currentUser[1]);
    
    // Atomically add a new region to the "regions" array field.
    await updateDoc(userRef, {
        Following: arrayUnion(UserInfo.Email)
    });
    

  }


  const UnFollowThisProfile = async ()=>{
    const userRef = doc(db, "users", currentUser[1]);
    await updateDoc(userRef, {
      Following: arrayRemove(UserInfo.Email)
    });
  }
  return (
    <div >
      {UserInfo !== null?<>

 <div className='MainInfo'>
<PhotoDialog id="ProfilePagePP" Image={UserInfo.PhotoURL}/>

<h3>{UserInfo.Name}</h3>
<p className="ProfileOverviewUsername">@{UserInfo.username}</p>
<p className='ProfileOverviewBio'>{UserInfo.bio}</p>

  {UserInfo.username==currentUser[0]?<button className='EditProfileButton'>Edit</button>:<button onClick={UserFollowsThisProfile?UnFollowThisProfile:FollowThisProfile} className='EditProfileButton'>{UserFollowsThisProfile?"Unfollow":"Follow"}</button>}


</div>

</> :
<></>}
    </div>
  )
}

export default ProfileOverview