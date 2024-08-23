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

// Security - env variables
import.meta.env.VITE_FIREBASE_API_KEY;

// Step 2: Define Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
console.log('Firebase API Key:', import.meta.env.VITE_FIREBASE_API_KEY);


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