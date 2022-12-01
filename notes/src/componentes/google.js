import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
//import onNavigate from 
const auth = getAuth();
const provider = new GoogleAuthProvider();

export const googleAuth = () => {

    signInWithPopup(auth, provider)
        .then((result) => {
            //onNavigate('/home');
            console.log('google sign in');
        })
        .catch((error) => {
            console.log(error);
        });
};
