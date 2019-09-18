import * as firebase from "firebase/app"


import "firebase/auth"
import "firebase/database"

// var firebase = require("firebase/app")
// require("firebase/auth")



var firebaseConfig = {
  apiKey: "AIzaSyCR48PtKk2NFKWcbabKJghHxmR4pquSWo0",
  authDomain: "awesometodo-6525b.firebaseapp.com",
  databaseURL: "https://awesometodo-6525b.firebaseio.com",
  projectId: "awesometodo-6525b",
  storageBucket: "",
  messagingSenderId: "810004146741",
  appId: "1:810004146741:web:864fbf21e7010b59391f7c"
}

let firebaseApp = firebase.initializeApp(firebaseConfig)

let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }
