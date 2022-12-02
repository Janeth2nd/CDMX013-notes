import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
//import onNavigate from 
const auth = getAuth();
const provider = new GoogleAuthProvider();

export const googleAuth = () => {
const promiseFirebase= signInWithPopup(auth, provider);
  
return promiseFirebase.then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    return user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    return error;
    // ...
  });
      
};
