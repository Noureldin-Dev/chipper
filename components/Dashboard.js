import React, { useEffect } from 'react';
import Feed from './Feed';
import SearchSection from './SearchSection';
import SideBar from './SideBar';
import { auth, provider } from '../firebase';
import { useRouter } from 'next/router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useState } from 'react';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore"; 
import Backdrop from '@mui/material/Backdrop';
import { db } from '../firebase';
import { TextField } from '@mui/material';
import { CircularProgress } from '@mui/material';
import LoadingScreen from './LoadingScreen';
import myContext from '../components/myContext';
import { useContext } from 'react';

// import "../styling/styles.css"
function Dashboard() {
  const {UsernameAndEmailChecker, setUsernameAndEmailChecker} = useContext(myContext);
const [LoadingIsComplete, setLoadingIsComplete] = useState(false)
  const [UsernameIsSet, setUsernameIsSet] = useState(true)
  const [NewUsernameToBeSet, setNewUsernameToBeSet] = useState("")
const [username, setusername] = useState("")
const [ShouldLoad, setShouldLoad] = useState(false)
const [LoadingAlternative, setLoadingAlternative] = useState(<></>)
const [PhotoURL, setPhotoURL] = useState("")
const [LoggedInObject, setLoggedInObject] = useState(null)
const UsernameError = NewUsernameToBeSet.includes(" ")


const CheckIfUsernameIsAvailable = () => {
return
}


  const setNewUsername =async  () => {
if ((NewUsernameToBeSet.length == 0)||NewUsernameToBeSet.includes(" ")){
  return
}
NewUsernameToBeSet=NewUsernameToBeSet.toLowerCase();
// Add a new document in collection "cities"
await setDoc(doc(db, "usernames",NewUsernameToBeSet), {
}).catch(err=>{
  console.log(err)
}).then(async(e)=>{
  await updateDoc(doc(db,'users', LoggedInObject.email),{
    username:NewUsernameToBeSet
      }).then(()=>{
      setUsernameIsSet(true)
      UsernameAndEmailChecker[0]=NewUsernameToBeSet
      setUsernameAndEmailChecker(UsernameAndEmailChecker)
      })
})

    }

  const router = useRouter();

  useEffect(async ()=>{
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoggedInObject(user)
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        

const docRef = doc(db, "users", user.email);
const docSnap = await getDoc(docRef).then((docSnap)=>{
  if (docSnap.data() !== undefined){
    console.log("docsnap.data was :"+  docSnap.data())
    if (docSnap.data().username != undefined) {
      setusername(docSnap.data().username)
    } else {
      // doc.data() will be undefined in this case
      setUsernameIsSet(false)
    }
    setLoadingIsComplete(true)
  return
  }else {
    console.log("docsnap.data was :"+  docSnap.data())
    
    setTimeout(()=>{document.location.reload()}, 4000);
  }
})


        // ...
      } else {
        // User is signed out
        // ...
      }
    });





  }
  ,[UsernameIsSet])

useEffect(()=>{
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
    //   router.push("/app")
    setPhotoURL(user.photoURL)
    console.log("user logged in")

const cityRef = doc(db, 'users', user.email);
await setDoc(cityRef, { PhotoURL: user.photoURL }, { merge: true });
      const uid = user.uid;
      // ...
    } else {
        console.log("user logged out")
router.push("/")

      // User is signed out
      // ...
    }
  });
},[])

  return (
<>
{LoggedInObject !== null?     <div id="DashboardDiv" className='fullScreenDiv' >
      
      <Backdrop open={!UsernameIsSet} 
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              >
                <div id="setUsernameBox">
        <h1>Set your username</h1>
        <p>This will be visible on all your posts and and will be used to tag you</p>
        <TextField error={UsernameError? true: false}
                  helperText={UsernameError? "Spaces are not allowed": false}
                    focused sx={{ borderColor:"white", input: { color: 'white'} }} onChange={(e)=>{
                      
                      setNewUsernameToBeSet(e.target.value)
                      if((e.target.value).length ==0){
                        setLoadingAlternative(<></>)
                      }
                      else{
                        CheckIfUsernameIsAvailable()
                      }
                      
                      }} label="Username" variant="outlined" />
{ShouldLoad? <CircularProgress />: LoadingAlternative}
        <button onClick={setNewUsername}>set</button>
        </div>
      </Backdrop>
      <SideBar currentScreen="Home" PhotoURL={PhotoURL} username={UsernameAndEmailChecker[0]} user={LoggedInObject}/>
      <Feed Screen="App" PhotoURL={PhotoURL} username= {username} user={LoggedInObject}/>
<SearchSection/>


    </div>
: <LoadingScreen/>}
</>
  )
}

export default Dashboard