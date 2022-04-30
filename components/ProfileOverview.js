import React, { useEffect, useState } from 'react'
import PhotoDialog from './PhotoDialog'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { Avatar, Divider, IconButton } from '@mui/material';
import LoadingScreen from './LoadingScreen';
import { useRouter } from 'next/router';



function ProfileOverview({LoggedInObject,currentUser, UserInfo}) {
  const router = useRouter()
  return (
    <div >
      {UserInfo !== null?<>

 <div className='MainInfo'>
<PhotoDialog id="ProfilePagePP" Image={UserInfo.PhotoURL}/>

<h3>{UserInfo.Name}</h3>
<p className="ProfileOverviewUsername">@{UserInfo.username}</p>
<p className='ProfileOverviewBio'>{UserInfo.bio}</p>

  {UserInfo.username==currentUser?<button id='EditProfileButton'>Edit</button>:<></>}


</div>

</> :
<></>}
    </div>
  )
}

export default ProfileOverview