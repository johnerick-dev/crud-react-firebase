import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
   apiKey: "AIzaSyBb1dNWq-PqXKS-FAQvXMYdOoUhPTLeHAo",
   authDomain: "crud-teste-a6320.firebaseapp.com",
   databaseURL: "https://crud-teste-a6320-default-rtdb.firebaseio.com",
   projectId: "crud-teste-a6320",
   storageBucket: "crud-teste-a6320.appspot.com",
   messagingSenderId: "969675414686",
   appId: "1:969675414686:web:14378c1529ba6cbddeef8f",
   measurementId: "G-N9B0P2ECT6"
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
