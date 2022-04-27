import React, { useEffect, useState } from 'react'
import PhotoDialog from './PhotoDialog'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { Avatar, Divider, IconButton } from '@mui/material';
import LoadingScreen from './LoadingScreen';
import { useRouter } from 'next/router';



function ProfileOverview({username,LoggedInObject,setDesiredProfileName}) {
  const router = useRouter()
  
  const [UserInfo, setUserInfo] = useState(null)
  const profile = username






  useEffect(async()=>{
    if (profile == undefined){

      return
    }


    const q = query(collection(db, "users"), where("username", "==", profile));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  setUserInfo(doc.data())
console.log(doc.data())
  setDesiredProfileName(doc.data())

  
});
  },[profile])






  return (
    <div >
      {UserInfo !== null?<>

 <div className='MainInfo'>
<PhotoDialog id="ProfilePagePP" Image={UserInfo.PhotoURL}/>

<h3>{UserInfo.Name}</h3>
<p className="ProfileOverviewUsername">@{UserInfo.username}</p>
<p className='ProfileOverviewBio'>{UserInfo.bio}</p>


</div>

</> :
<></>}
    </div>
  )
}

export default ProfileOverview