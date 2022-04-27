import React, {useEffect, useState} from 'react'
import PostSomething from './PostSomething'
import { collection, query, getDocs,where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from '../firebase';
import { limit } from 'firebase/firestore';
import { Avatar,IconButton } from '@mui/material';
// import LoadingScreen from './LoadingScreen';
import CircularProgress from '@mui/material/CircularProgress';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Popover,Typography } from '@mui/material';
import { deleteDoc, doc } from 'firebase/firestore';
import {List, ListItem, ListItemButton} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';
import CustomAlert from './CustomAlert';
import {  arrayUnion, arrayRemove,updateDoc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { Book } from '@mui/icons-material';
import Link from 'next/link';
import LoadingScreen from './LoadingScreen';
import { increment } from "firebase/firestore";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { getStorage, ref,getDownloadURL,listAll } from "firebase/storage";

const storage = getStorage();




function Feed({user,username,PhotoURL, isBookmark,desiredBookmarks=undefined, isProfile=false, desiredProfile=undefined}) {
const [Posts, setPosts] = useState([])
const [LoadingIsDone, setLoadingIsDone] = useState(false)
const [OptionsFocused, setOptionsFocused] = useState(null)
const [anchorEl, setAnchorEl] = React.useState(null);
const [PostAttemptFeedback, setPostAttemptFeedback] = useState(<></>)



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
{isBookmark?      
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
                        <span>{isBookmark?"Unbookmark":"Bookmark"}</span>
      
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

              <ListItemButton onClick={()=>(DeletePost(OptionsFocused.ID))}>
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
                  <span>{isBookmark?"Unbookmark":"Bookmark"}</span>

                </div>
              </ListItemButton>
            </ListItem>
          </List>
          </div>
  }
</Popover>
    <Avatar referrerPolicy="no-referrer" className='PostUserProfile' src={post.PhotoURL}/>
    <Link href={`/user/${encodeURIComponent(post.ProfileOfPoster)}`}>

    <a className='PostNameOfPoster' >
<p className='DisplayNameOfPoster' >{post.NameOfPoster}</p>
<p className='PostUsername'>@{post.ProfileOfPoster}</p>
</a>
</Link>
<br></br>
    <p onClick={()=>console.log(post)} className='PostText'>{post.Text}</p>
  </div>
  )

  useEffect(async function () {

    if (isBookmark !== undefined){
      try{
      const q = query(collection(db, "posts"), orderBy("Date", "desc"), where("ID","in",desiredBookmarks));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach(async (doc) => {

// console.log(doc.data().ID)
          
          // Create a reference under which you want to list
          const listRef = ref(storage, doc.data().ID+"/Images");
          

          var PostImages = []
console.log("PostImages")
console.log(PostImages)
          listAll(listRef)
          .then((res) => {
            res.items.forEach((itemRef) => {


              getDownloadURL(ref(storage, itemRef._location.path_))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'


    // Or inserted into an <img> element
    console.log(url)
    PostImages.push(url)
    
  })
  .catch((error) => {
    // Handle any errors
  });




            });
          }).catch((error) => {
            // Uh-oh, an error occurred!
          });

var ToBePosted = {...doc.data(),...PostImages}
// console.log("ToBePosted")
          posts.push(doc.data());
        });
const Loop = async (posts) => {
  var postss = []

  for (const Post of posts) {



    // console.log(Post);
    const citiesRef = collection(db, "users");
    const q2 = query(citiesRef, where("username", "==", Post.ProfileOfPoster));
    const querySnapshot2 = await getDocs(q2);

    const FetchedPP = [];
    querySnapshot2.forEach((doc1) => {
      FetchedPP.push((doc1.data().PhotoURL).replace("s96","s200"));

    });
    const FinalPost = { ...Post, ...{ PhotoURL: FetchedPP[0].replace("s96","s200") } };
    // console.log(FinalPost)
    postss.push(FinalPost);
  }
  // console.log(postss)

  return postss
}



Loop(posts).then((res)=>{setPosts(res); setLoadingIsDone(true)})
// console.log(x.then(value=>return value))
        // console.log(posts)
        // setPosts(x);
        // console.log(Loop(posts))
        // Loop(posts)
        // console.log(posts)
      });}catch(err){}}


    if (isBookmark == undefined){
      try{



const q = isProfile?query(collection(db, "posts"), orderBy("Date", "desc"),where("ProfileOfPoster","==",desiredProfile), limit(5)):query(collection(db, "posts"), orderBy("Date", "desc"), limit(10));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach(async (doc) => {
          // console.log(doc.data().ProfileOfPoster)

          // posts.push(FinalPost);
          posts.push(doc.data());
        });
const Loop = async (posts) => {
  var postss = []

  for (const Post of posts) {
    // console.log(Post);
    const citiesRef = collection(db, "users");
    const q2 = query(citiesRef, where("username", "==", Post.ProfileOfPoster));
    const querySnapshot2 = await getDocs(q2);

    const FetchedPP = [];
    querySnapshot2.forEach((doc1) => {
      FetchedPP.push(doc1.data().PhotoURL.replace("s96","s200"));

    });
    const FinalPost = { ...Post, ...{ PhotoURL: FetchedPP[0] } };
    // console.log(FinalPost)
    postss.push(FinalPost);
  }
  // console.log(postss)

  return postss
}



Loop(posts).then((res)=>{setPosts(res);
   setLoadingIsDone(true)

  })
// console.log(x.then(value=>return value))
        // console.log(posts)
        // setPosts(x);
        // console.log(Loop(posts))
        // Loop(posts)
        // console.log(posts)
      });
    
    
    }catch{}}
    },[desiredBookmarks,desiredProfile])
  return (
<>
{isProfile?

<div  id='DisplayedPosts'>
{LoadingIsDone?DisplayedPosts:<></>}
</div>

:  <>
  {PostAttemptFeedback}
    <div className='MiddleColumnContainer'>
    <header id="FeedHeader"><strong>{isBookmark? "Bookmarks":"Home"}</strong></header>

        {isBookmark||isProfile?<></>:<PostSomething PhotoURL={PhotoURL.replace("s96","s200")} username={username} user={user}/>}
        <div id='DisplayedPosts'>
{LoadingIsDone?

(Posts?.length !== 0 )? DisplayedPosts:

isBookmark?

<div>
<h2>You have no bookmarks</h2>
<p style={{width:"fit-content", color:"grey", marginTop:"-10px", marginLeft:"auto", marginRight:"auto"}}>When you bookmark posts they will appear here</p>
</div>:<><h2>There are no posts yet. Be the first to post!</h2></>

:<div className='loader'><CircularProgress size={"40px"} /></div> }

</div>
    </div></>}
</>
  )
}

export default Feed