import firebase from 'firebase/app'
import 'firebase/firestore'

let firebaseConfig = {
apiKey: "AIzaSyCxs5a1zJvmYTOWUdfBm2S3jrqH8IrvG8I",
authDomain: "petsystem-9c1bf.firebaseapp.com",
databaseURL: "https://petsystem-9c1bf.firebaseio.com",
projectId: "petsystem-9c1bf",
storageBucket: "petsystem-9c1bf.appspot.com",
messagingSenderId: "823591162749",
appId: "1:823591162749:web:a13e0f088c3d1534353214",
measurementId: "G-QTQXD4LRG7"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const db = firebaseApp