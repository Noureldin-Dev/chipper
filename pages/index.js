import React, { useEffect } from 'react'
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from '../firebase';
import { useRouter } from 'next/router';
import Head from 'next/head';
function login() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //   router.push("/app")

        console.log("user logged in")
        router.push("/app")
        const uid = user.uid;
        // ...
      } else {
        console.log("user logged out")
        // User is signed out
        // ...
      }
    });
  }, [])

  const loginWithGoogle = () => {

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // router.push("/app")
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  return (
    <>
          <Head>
<title>Login / Chipper</title>
</Head>
    <div id='LoginScreenContainer'>

      <div id="loginScreenLeftSide">

        <div id='LoginScreenHeading'>
        {/* <svg id='SVG' viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
          <path  d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
        </svg> */}
        <p>See what's happening</p>
        </div>

      </div>
      <div id="loginScreenRightSide">

        <button onClick={() => signOut(auth)}>sign out</button>
        <button onClick={loginWithGoogle}>google</button>
        <button onClick={() => { console.log(auth.currentUser) }}>currentuser</button>
      </div>


    </div></>
  )
}

export default login