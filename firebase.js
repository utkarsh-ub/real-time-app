import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBfnXIEWMlHrExa_7WhBgzYYl0Z2P9GeQ4",
    authDomain: "real-time-messenger-e130a.firebaseapp.com",
    projectId: "real-time-messenger-e130a",
    storageBucket: "real-time-messenger-e130a.appspot.com",
    messagingSenderId: "133058439375",
    appId: "1:133058439375:web:9b2ed8a319931e77fa2fba"
  };

let app;

if(firebase.apps.length===0)
{
  app=firebase.initializeApp(firebaseConfig);
}  else{
  app=firebase.app();
}

const db=app.firestore();
const auth=firebase.auth();

export {db,auth};
