import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPFHG6tm11G-062mLBXvppKIurvi9Q5b8",
  authDomain: "labnotes-react-437bd.firebaseapp.com",
  projectId: "labnotes-react-437bd",
  storageBucket: "labnotes-react-437bd.appspot.com",
  messagingSenderId: "1091042983323",
  appId: "1:1091042983323:web:43ade13b73bcff3039753e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const auth = getAuth();

export default db;