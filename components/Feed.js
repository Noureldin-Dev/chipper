import React, {useEffect, useRef, useState} from 'react'
import PostSomething from './PostSomething'
import { db } from '../firebase';
import { Avatar,IconButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Popover,Typography } from '@mui/material';
import { deleteDoc, doc } from 'firebase/firestore';
import {List, ListItem, ListItemButton} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import CustomAlert from './CustomAlert';
import {  arrayUnion, arrayRemove,updateDoc } from "firebase/firestore";
import Link from 'next/link';
import LoadingScreen from './LoadingScreen';
import { increment } from "firebase/firestore";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { getStorage, ref,getDownloadURL,listAll } from "firebase/storage";
import Post from "../components/Infinite endless scroll/Post"

const storage = getStorage();




function Feed({user,username,PhotoURL,desiredBookmarks=undefined, Screen, desiredProfile=undefined,HaveToLoadMorePosts,ParentFeedUpdated}) {
const [Posts, setPosts] = useState([])
const [nextPosts_loading, setNextPostsLoading] = useState(false);
const [lastKey, setLastKey] = useState("");
const [LoadingIsDone, setLoadingIsDone] = useState(false)
const [OptionsFocused, setOptionsFocused] = useState(null)
const [anchorEl, setAnchorEl] = React.useState(null);
const [PostAttemptFeedback, setPostAttemptFeedback] = useState(<></>)
const [FeedUpdated, setFeedUpdated] = useState(false)
const [IsLoadingOlderPosts, setIsLoadingOlderPosts] = useState(false)
const [LoadedAllPosts, setLoadedAllPosts] = useState(false)

const listInnerRef = useRef();
const onScroll = async () => {
  if (listInnerRef.current) {
    const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
    if (scrollTop + clientHeight === scrollHeight) {
      console.log(scrollTop)
      console.log(clientHeight)
      console.log(scrollHeight)
      console.log("reached bottom");
      setIsLoadingOlderPosts(true)
      await GetMorePosts().then(()=>{
        setIsLoadingOlderPosts(false)
      })

    }
  }
};


useEffect(()=>{
  GetMorePosts()
  return()=>{}
},[HaveToLoadMorePosts])
    



const GetMorePosts = async() => {
var NewBatch =[]
  switch (Screen) {
    case "App":

      NewBatch =await Post.GetMorePosts(lastKey)
      
      break;

      // case "Bookmarks":
      //   NewBatch =await Post.GetMorePostsOfBookmarks(lastKey)
      //   break;

      case "Profile":
        if (desiredProfile == undefined){
          return
        }
        NewBatch =await Post.GetMorePostsOfProfile(lastKey, desiredProfile)
        break;
  

  }


    if (NewBatch.length != 0){
    setPosts(Posts.concat(NewBatch))
    setLastKey(NewBatch[NewBatch.length-1].Date)
    }
    else{
      setLoadedAllPosts(true)
    }

}











const handleClose = () => {
  setAnchorEl(null);
}

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
  // console.log(event.currentTarget)
  // setOptionsFocused(id)
};



const DeletePost = async (postID) => {
await deleteDoc(doc(db, "posts", postID)).then(async e=>{
  handleClose()


const washingtonRef = doc(db, "users", user.email);

// Atomically increment the population of the city by 50.
await updateDoc(washingtonRef, {
  NumberOfPosts: increment(-1)
}).then(()=>{
  setFeedUpdated(!FeedUpdated)
  setPostAttemptFeedback(<CustomAlert message='Post deleted successfully'/>)
  setTimeout(()=>{setPostAttemptFeedback(<></>)},3400)
})

})
}

const EditPost = () => {
  
}

const UnbookmarkPost = async (id) => {
  // console.log("buo")
  
  const UserRef = doc(db, "users", user.email);

await updateDoc(UserRef, {
    Bookmarks: arrayRemove(id)
}).then(e=>{
handleClose()
setPostAttemptFeedback(<CustomAlert message='Post removed from bookmarks successfully'/>)
setTimeout(()=>{setPostAttemptFeedback(<></>)},3400)
})}

const BookmarkPost = async (id) => {


const UserRef = doc(db, "users", user.email);

await updateDoc(UserRef, {
    Bookmarks: arrayUnion(id)
}).then(e=>{
  handleClose()
  setPostAttemptFeedback(<CustomAlert message='Post added to bookmarks successfully'/>)
  setTimeout(()=>{setPostAttemptFeedback(<></>)},3400)
  })

}

const DisplayedPosts = Posts.map(post =>
    <div key={post.ID} className='PostContainer'>
      <IconButton onClick={(e)=>{
        handleClick(e);
        setOptionsFocused(post)
      }} className='MoreHorizIcon'><MoreHorizIcon /></IconButton>
      <Popover
  
  style={{width:"300px", display:anchorEl==null?"none":"block"}}
      id={post.ID}
    open={anchorEl!==null ? true:false}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{
      vertical: 'center',
      horizontal: 'center',
    }}
    transformOrigin={{
  vertical:"top",
  horizontal:"right"
    }}
    
  >
  
    {OptionsFocused?.ProfileOfPoster== username?
      <div className="OptionsOwnPost">
        <List style={{width:"100%"}} >
  {Screen == "Bookmarks"?      
   <ListItem className="PostOptionItem" disablePadding>
          <ListItemButton onClick={()=>(UnbookmarkPost(OptionsFocused.ID))}>
                  <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                    <BookmarkIcon/>
                    <span >Unbookmark</span>
  
                  </div>
                </ListItemButton>
          </ListItem>: 
                      <ListItem className="PostOptionItem" disablePadding>
  
                      <ListItemButton onClick={()=>{
                        if (desiredBookmarks?.includes(OptionsFocused.ID)){
                          UnbookmarkPost(OptionsFocused.ID)
                        }else{
                          // console.log()
                          BookmarkPost(OptionsFocused.ID)
                        }
                      }}>
                        <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
  <BookmarkIcon/>
                          <span>{Screen == "Bookmarks"?"Unbookmark":"Bookmark"}</span>
        
                        </div>
                      </ListItemButton>
                    </ListItem>
                    }
          <ListItem className="PostOptionItem" disablePadding>
          <ListItemButton onClick={()=>(EditPost(OptionsFocused.ID))}>
                  <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                    <DeleteIcon sx={{ color: "#18a39a" }}/>
                    <span >Edit</span>
  
                  </div>
                </ListItemButton>
          </ListItem>
              <ListItem className="PostOptionItem" disablePadding>
  
                <ListItemButton onClick={()=>{
                  DeletePost(OptionsFocused.ID)
                  // UnbookmarkPost(OptionsFocused.ID)
                  }}>
                  <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                    <DeleteIcon sx={{ color: "#18a39a" }}/>
                    <span style={{color:"red"}}>Delete</span>
  
                  </div>
                </ListItemButton>
              </ListItem>
            </List>
            </div>
            :
            <div className="OptionsOwnPost">
        <List style={{width:"100%"}} >
         
              <ListItem className="PostOptionItem" disablePadding>
  
                <ListItemButton onClick={()=>{
                  if (desiredBookmarks?.includes(OptionsFocused.ID)){
                    UnbookmarkPost(OptionsFocused.ID)
                  }else{
                    // console.log()
                    BookmarkPost(OptionsFocused.ID)
                  }
                }}>
                  <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                    <BookmarkIcon />
                    <span>{Screen == "Bookmarks"?"Unbookmark":"Bookmark"}</span>
  
                  </div>
                </ListItemButton>
              </ListItem>
            </List>
            </div>
    }
  </Popover>
      <Link href={`/user/${encodeURIComponent(post.ProfileOfPoster)}`}>
  
      <a className='PostNameOfPoster' >
      <Avatar referrerPolicy="no-referrer" className='PostUserProfile' src={post.PhotoURL}/>
  <p className='DisplayNameOfPoster' >{post.NameOfPoster}</p>
  <p className='PostUsername'>@{post.ProfileOfPoster}</p>
  </a>
  </Link>
  <br></br>
      <p onClick={()=>console.log(post)} className='PostText'>{post.Text}</p>
    </div>
    )


  
useEffect(async() => {
try{
  switch(Screen) {
    case "App":
      const FirstPostsApp =await Post.GetFirstBatch();
      setPosts(FirstPostsApp)
      setLastKey(FirstPostsApp[FirstPostsApp.length-1].Date)
      setLoadingIsDone(true)
      break;
    case "Bookmarks":
      if (desiredBookmarks == null){
        return
      }

        const FirstPostsBookmarks =await Post.GetFirstBatchOfBookmarks(desiredBookmarks);
        console.log(await FirstPostsBookmarks)
        setPosts(FirstPostsBookmarks)
        setLastKey(FirstPostsBookmarks[FirstPostsBookmarks.length-1].Date)
      setLoadingIsDone(true)

      
      break;
    case "Profile":
      const FirstPostsProfile =await Post.GetFirstBatchOfProfile(desiredProfile);
      console.log(await FirstPostsProfile)
      setPosts(FirstPostsProfile)
      setLastKey(FirstPostsProfile[FirstPostsProfile.length-1].Date)
      setLoadingIsDone(true)
      break;

      // code block
  } }
  catch{
    setLoadingIsDone(true)
  }


return()=>{
  setPosts()
  setLastKey()
  setLoadingIsDone()
}




},[FeedUpdated,ParentFeedUpdated, desiredBookmarks,desiredProfile])
  
  return (
<>
{PostAttemptFeedback}

{Screen == "Profile"?
<>
<div id='DisplayedPosts'>
{LoadingIsDone?DisplayedPosts:<></>}
{IsLoadingOlderPosts && LoadedAllPosts== false?<div style={{overflow:"hidden", height:"100px"}}><CircularProgress sx={{marginTop:"25px"}} size={"50px"} /></div>:<></>}

</div>
</>
:  <>
    <div onScroll={onScroll}
                    ref={listInnerRef} className='MiddleColumnContainer'>
    <header id="FeedHeader"><strong>{Screen == "Bookmarks"? "Bookmarks":"Home"}</strong></header>

        {Screen == "App"?<PostSomething updateFeed={[FeedUpdated, setFeedUpdated]} PhotoURL={PhotoURL.replace("s96","s200")} username={username} user={user}/>:<></>}
        <div id='DisplayedPosts'>
{LoadingIsDone?

(Posts?.length !== 0 )? DisplayedPosts:

Screen == "Bookmarks"?

<div>
<h2>You have no bookmarks</h2>
<p style={{width:"fit-content", color:"grey", marginTop:"-10px", marginLeft:"auto", marginRight:"auto"}}>When you bookmark posts they will appear here</p>
</div>:

<><h2>There are no posts yet. Be the first to post!</h2></>



:
<div className='loader'><CircularProgress size={"40px"} /></div> }




{IsLoadingOlderPosts && LoadedAllPosts== false?<div style={{overflow:"hidden", height:"100px"}}><CircularProgress sx={{marginTop:"25px"}} size={"50px"} /></div>:<></>}

</div>


    </div></>}
</>
  )
}

export default Feed