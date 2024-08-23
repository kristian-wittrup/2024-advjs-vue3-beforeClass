<template>
  <div class="about">
    <h1>Movies</h1>
    <input v-model="newMovieTitle" placeholder="Add a new movie" />
    <button @click="addMovie">Add Movie</button>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        {{ movie }}   
        <button @click="deleteMovie(movie.id)">Delete</button> 
      </li>
    </ul>
    
  </div>
</template>

<script setup lang="ts">
// Step 1: Import necessary modules and setup component
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

// Step 3.1 Define collection reference
const moviesFirebaseCollectionRef = 'movies';

// Step 4: Define reactive state
const movies = ref([]);  


// Step 5: Fetch data from Firestore on component mount
onMounted(() => {
  const moviesCollection = collection(db, moviesFirebaseCollectionRef);
  onSnapshot(moviesCollection, (snapshot) => {
    movies.value = snapshot.docs.map(doc => ({
      id: doc.id,

      // Step 5.1: individual properties
      // title: doc.data().title,
      // director: doc.data().director
      
      // Step 5.2 - Refactor the above two lines using the spread operator
      // spread operator
      ...doc.data()
    }));
  });
});



// Step 6 - Add new movie
const newMovieTitle = ref('');

// Step 7 Refactor addMovie method. Use a const newMovie and pass it to addDoc, instead of having the object in the addDoc method.
const addMovie: Movie = async () => {
  if (newMovieTitle.value.trim() === '') return;

  const moviesCollection = collection(db, 'movies');
  const newMovie = {
    title: newMovieTitle.value,

    // Step 7.1 Add static director
    director: "That guy"
  };

    await addDoc(moviesCollection, newMovie);

  newMovieTitle.value = '';
}

// Step 7 - Delete a movie with id from firebase
const deleteMovie = async (id) => {
  console.log('Deleting movie with id:', id);
  const movieDoc = doc(db, 'movies', id);
  await deleteDoc(movieDoc);
};

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>