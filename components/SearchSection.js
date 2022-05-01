import React, { useEffect, useState } from 'react'
import { doc, getDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import {db} from "../firebase"
import { Avatar, Link } from '@mui/material';

function SearchSection() {

const [TopUsers, setTopUsers] = useState([])


  useEffect(async()=>{
    const docRef = collection(db, "users");
    const q = query(docRef, orderBy("NumberOfPosts"), limit(3));
    console.log(q)
    const querySnapshot = await getDocs(q);
    var topUsers =[]
querySnapshot.forEach((doc) => {
  topUsers.push(doc.data())
});
setTopUsers(topUsers)
  },[])
  return (
    <div id="SearchParent">
      <div id='SearchParent2'>
      <div id="SearchChipperBox">
        <input id='ActualSearchElement'></input>
      </div>
    <div id='WhatsHappeningBox'>
    <h3>What's happening</h3>
    </div>

    <div id='WhoToFollowBox'>
      <h3>Who to follow</h3>
      {TopUsers.length == 0?<></>:
           TopUsers.map(user=>
      <Link style={{textDecoration:"none"}} className='Names ' href={`/user/${encodeURIComponent(user.username)}`}>
        <div className='WhoToFollowProfiles'>
      <Avatar  src={user.PhotoURL}/>
      <a>
      <p ><span style={{fontWeight:600}}>{user.Name}</span><br></br><span style={{fontWeight:300, color:'gray'}}>{user.username}</span></p>

      </a>
      </div>

      </Link>

          )}
    </div>
    </div>
    </div>
  )
}

export default SearchSection