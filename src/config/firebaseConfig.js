import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCptyPaCnPIv6pHw8v9AIHDAh-q85giekA",
  authDomain: "ultireactjs.firebaseapp.com",
  projectId: "ultireactjs",
  storageBucket: "ultireactjs.appspot.com",
  messagingSenderId: "720048114064",
  appId: "1:720048114064:web:21a26f383e8d4be31a0b15"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, firebaseConfig }; 