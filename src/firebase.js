import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRB7yDiN5UntLNMX5TPV9M4L1f7R4Hcxc",
  authDomain: "georacer-33d80.firebaseapp.com",
  projectId: "georacer-33d80",
  storageBucket: "georacer-33d80.appspot.com",
  messagingSenderId: "140919837330",
  appId: "1:140919837330:web:3094554c10173a75188c4b",
  measurementId: "G-X85CHEZPNQ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export the Firebase authentication functions
const auth = firebase.auth();

const signOut = () => {
  auth.signOut();
};

const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
};

export { auth, signInWithGoogle, signOut };
