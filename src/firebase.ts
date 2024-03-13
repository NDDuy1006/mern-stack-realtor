// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API_KEY,
  authDomain: "my-realtor-c17bf.firebaseapp.com",
  projectId: "my-realtor-c17bf",
  storageBucket: "my-realtor-c17bf.appspot.com",
  messagingSenderId: "196589119117",
  appId: "1:196589119117:web:3de93e181a28df3b12a4c4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);