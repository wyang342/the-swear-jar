import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";

// Pages
import LoginPage from "./pages/LoginPage";

// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWz5mwcTQ1AJj9Mbim5QT2pPdsAAF9_XE",
  authDomain: "the-swear-jar-1.firebaseapp.com",
  projectId: "the-swear-jar-1",
  storageBucket: "the-swear-jar-1.appspot.com",
  messagingSenderId: "297263056849",
  appId: "1:297263056849:web:edb1b5d3b9a785739642f0",
  measurementId: "G-GBYSM2B8C2",
};
const firebaseApp = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, "http://localhost:9099");

// React Router

function App() {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
