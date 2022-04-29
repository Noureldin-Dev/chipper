import React, {useRef, useState} from 'react'
import { db } from '../firebase';
import TextareaAutosize from 'react-textarea-autosize';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import IconButton from '@mui/material/IconButton';
import { collection, addDoc } from "firebase/firestore"; 
import { serverTimestamp } from 'firebase/firestore';
import { doc, setDoc } from "firebase/firestore"; 
import CustomAlert from './CustomAlert';
import { updateDoc, increment } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";


function PostSomething({user, username,PhotoURL, updateFeed}) {
const [TextToBePosted, setTextToBePosted] = useState("")
const [PostAttemptFeedback, setPostAttemptFeedback] = useState(<></>)
const [SelectedFiles, setSelectedFiles] = useState([]);
const [IsFilePicked, setIsFilePicked] = useState(false)


const hiddenFileInput = useRef(null);
const ImageChangeHandler = (event) => {

  setSelectedFiles(event.target.files);


};

const UploadFiles = async(PostId) => {
  if (SelectedFiles.length == 0){
    return
  }
  const storage = getStorage();
  
  Array.from(SelectedFiles).forEach((File)=>{
  const storageRef = ref(storage, PostId+"/Images/"+File.name);
  uploadBytes(storageRef,File).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });

})

// 'file' comes from the Blob or File API

}

  const postFunction =async () => {



// Add a new document with a generated id
const newDocRef = doc(collection(db, "posts"));

UploadFiles(newDocRef.id)

await setDoc(newDocRef, 
  {
    ID:newDocRef.id,
    NameOfPoster: user.displayName,
    ProfileOfPoster: username,
    Text: TextToBePosted,
    Date:serverTimestamp()
  }
  ).then(async()=>{


const washingtonRef = doc(db, "users", user.email);

// Atomically increment the population of the city by 50.
await updateDoc(washingtonRef, {
    NumberOfPosts: increment(1)
}).then(()=>{
  updateFeed[1](!updateFeed[0])
  setPostAttemptFeedback(<CustomAlert message="Post created successfully"/>)
  setTimeout(()=>{setPostAttemptFeedback(<></>)},3300)
})



   
  })

// Add a new document with a generated id.
// const docRef = await addDoc(collection(db, "posts"), {
//   NameOfPoster: user.displayName,
//   ProfileOfPoster: username,
//   Text: TextToBePosted,
//   Date:serverTimestamp()
// });
setTextToBePosted("")
return
  }
  return (
    <>
    {PostAttemptFeedback}
      <div id='PostAnything'>
    <div id='PostSomething'>

    <Avatar sx={{height:"50px", width:"50px"}} referrerPolicy="no-referrer"  src={PhotoURL}/>


<TextareaAutosize value={TextToBePosted} onChange={e=>setTextToBePosted(e.target.value)} id='WhatsHappening' maxLength={280} style={{resize:"none"}} placeholder="What's happening?"/>

    </div>
    <div id="PostOptions">
      <div id='otherPostOptions'>
      <input hidden ref={hiddenFileInput} id='ActualFileSubmit' type="file" name="file" accept="image/*" onChange={ImageChangeHandler} multiple />
      <button onClick={()=>console.log(SelectedFiles)}>selected</button>
    <IconButton onClick={()=>{hiddenFileInput.current.click()}} ><ImageOutlinedIcon style={{ fill: '#139BED' }} /></IconButton>
    <IconButton ><GifBoxOutlinedIcon style={{ fill: '#139BED' }} /></IconButton>
    <IconButton ><PollOutlinedIcon style={{ fill: '#139BED' }} /></IconButton>
    <IconButton id="HideThisToo" ><SentimentSatisfiedOutlinedIcon style={{ fill: '#139BED' }} /></IconButton>
    <IconButton id="CalendarButton" ><CalendarMonthOutlinedIcon style={{ fill: '#139BED' }} /></IconButton>
   
<IconButton ><FmdGoodOutlinedIcon style={{ fill: '#139BED' }} /></IconButton>
</div>

<button onClick={()=>{
  if (TextToBePosted.length == 0){
    return
  }
  else{
    postFunction()
  }
}} id="postTweetButton"


>Chirp</button>


    
</div>

    </div>
    </>
  )
}

export default PostSomething