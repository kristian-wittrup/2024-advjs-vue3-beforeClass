import { ref, onMounted } from 'vue';
import { allCollections } from './firebase'; // Import the Firestore collections - no need to import the individual collections or db, since it is all handled in the firebase.js file
import { onSnapshot, addDoc, doc, deleteDoc } from 'firebase/firestore';


export function useMovies() {
  const movies = ref([]);
  const newMovieTitle = ref('');

  // Fetch data from Firestore on component mount
  onMounted(() => {
    const { movies: moviesCollection } = allCollections;
    onSnapshot(moviesCollection, (snapshot) => {
      movies.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    });
  });

  // Method to add a new movie
  const addMovie = async () => {
    // Prevent adding empty movie titles + the return statement will stop the function from executing further if the condition is met - ie the movie title is empty
    // return not needed, but it is a good practice to have it here. You can remove it if you want to and put it in the curly braces of the if statement
    if (newMovieTitle.value.trim() === '') return; 

    const { movies: moviesCollection } = allCollections;
    const newMovie = {
      title: newMovieTitle.value,
      director: "That guy"
    };

    await addDoc(moviesCollection, newMovie);
    newMovieTitle.value = '';
  };

  // Method to delete a movie
  const deleteMovie = async (id) => {
    const movieDoc = doc(allCollections.movies, id);
    await deleteDoc(movieDoc);
  };

  return {
    movies,
    newMovieTitle,
    addMovie,
    deleteMovie
  };
}