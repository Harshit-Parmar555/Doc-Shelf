// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const dotenv = require("dotenv");
dotenv.config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: "practice-a520c.appspot.com",
  messagingSenderId: process.env.MESSANGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports = { app };
