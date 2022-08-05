import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdj8mOUlcsbpFsNSXPgI0AnF5dyA2A7P4",
  authDomain: "otp-register-26765.firebaseapp.com",
  projectId: "otp-register-26765",
  storageBucket: "otp-register-26765.appspot.com",
  messagingSenderId: "760728802746",
  appId: "1:760728802746:web:27583bb093621bac18b983",
  measurementId: "G-0E0QW2SWB2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
