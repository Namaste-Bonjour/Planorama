import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//  web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD48W-oBOfl51wD2tqqmKv_RlLV70-D4pk",
  authDomain: "planorama-ef8ef.firebaseapp.com",
  databaseURL: "https://planorama-ef8ef-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "planorama-ef8ef",
  storageBucket: "planorama-ef8ef.firebasestorage.app",
  messagingSenderId: "561118315853",
  appId: "1:561118315853:web:3e25697a6706e317bb2304"
};

// Initialize Firebase
function Init() {
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
}


export default Init;