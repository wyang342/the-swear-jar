import React from "react";
import logo from "./logo.svg";
import "./App.css";

// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
