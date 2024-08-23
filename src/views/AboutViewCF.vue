<template>
  <div class="about">
    <h4>About with Composable function and Seperation of Concerns</h4>
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
import { useMovies } from '../modules/useMovies';

const { movies, newMovieTitle, addMovie, deleteMovie } = useMovies();
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