import firebase from 'firebase'
import 'firebase/firestore'

 export default  firebase.initializeApp({
  apiKey: "AIzaSyCQhz1hQ_yC0UShoZqsGIIVaTmR5xylY-I",
  authDomain: "whatsapp-direct-6d311.firebaseapp.com",
  projectId: "whatsapp-direct-6d311",
  storageBucket: "whatsapp-direct-6d311.appspot.com",
  messagingSenderId: "1086426053833",
  appId: "1:1086426053833:web:a1cd98347fd72414d42118",
  measurementId: "G-CHHGYQWBKF"
});

export let db = firebase.firestore()
export let auth = firebase.auth();
