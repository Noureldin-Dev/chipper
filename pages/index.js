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
    <div id="loginScreenRightSide">
<div id='loginScreenRightSideContent'>
<h1>Happening now</h1>
<h2>Join Chipper today.</h2>
        <button id='SignInWithGoogleButton' onClick={loginWithGoogle}>Sign in with Google</button>
    <p id='CreditingTwitter'>Chipper is a twitter clone</p>

        </div>
      </div>
      <div id="loginScreenLeftSide">
{/* <svg>
      <path xmlns="http://www.w3.org/2000/svg" style="fill:#2aa9e0" inkscape:connector-curvature="0" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" id="path5" d="m 453.82593,412.80619 c -6.3097,2.79897 -13.09189,4.68982 -20.20852,5.54049 7.26413,-4.35454 12.84406,-11.24992 15.47067,-19.46675 -6.79934,4.03295 -14.3293,6.96055 -22.34461,8.53841 -6.41775,-6.83879 -15.56243,-11.111 -25.68298,-11.111 -19.43159,0 -35.18696,15.75365 -35.18696,35.18525 0,2.75781 0.31128,5.44359 0.91155,8.01875 -29.24344,-1.46723 -55.16995,-15.47582 -72.52461,-36.76396 -3.02879,5.19662 -4.76443,11.24048 -4.76443,17.6891 0,12.20777 6.21194,22.97747 15.65332,29.28716 -5.76773,-0.18265 -11.19331,-1.76565 -15.93716,-4.40083 -0.004,0.14663 -0.004,0.29412 -0.004,0.44248 0,17.04767 12.12889,31.26806 28.22555,34.50266 -2.95247,0.80436 -6.06101,1.23398 -9.26989,1.23398 -2.2673,0 -4.47114,-0.22124 -6.62011,-0.63114 4.47801,13.97857 17.47214,24.15143 32.86992,24.43441 -12.04227,9.43796 -27.21366,15.06335 -43.69965,15.06335 -2.84014,0 -5.64082,-0.16722 -8.39349,-0.49223 15.57186,9.98421 34.06703,15.8094 53.93768,15.8094 64.72024,0 100.11301,-53.61524 100.11301,-100.11387 0,-1.52554 -0.0343,-3.04251 -0.10204,-4.55261 6.87394,-4.95995 12.83891,-11.15646 17.55618,-18.21305 z"/>
      </svg> */}
      </div>



    </div>
    </>
  )
}

export default login