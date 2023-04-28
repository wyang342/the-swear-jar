// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import {
  NextOrObserver,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth(firebaseApp);

// Typescript automatically infers return type of functions
export async function signInDefault(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function signOutDefault() {
  return await signOut(auth);
}

export async function signUpDefault(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export function userStateListener(callback: NextOrObserver<User>) {
  return onAuthStateChanged(auth, callback);
}

export default firebaseApp;
