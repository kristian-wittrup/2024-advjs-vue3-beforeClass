import { ref, onMounted } from 'vue';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  onSnapshot, 
  addDoc/* Step 6*/, 
  /* Step 7 START*/
  deleteDoc, 
  doc
  /* Step 7 END*/ } from 'firebase/firestore';

// Step 2: Define Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1-wNwR9I8Q41XTcEs7kDhI07E_5dpw0U",
  authDomain: "vue-crud-inclass.firebaseapp.com",
  projectId: "vue-crud-inclass",
  storageBucket: "vue-crud-inclass.appspot.com",
  messagingSenderId: "802036065562",
  appId: "1:802036065562:web:38d4263f858a20d63438a3"
};

// Step 3: Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Step 4: Reference to collections
const allCollections = {
  movies: collection(db, 'movies'),
  users: collection(db, 'users')
};

//const moviesCollection = collection(db, 'movies');

export { db, allCollections };