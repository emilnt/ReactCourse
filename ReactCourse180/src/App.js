import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try { // axios er et annet valg, den kaster feil ved feilkoder som default
      const response = await fetch("https://swapi.dev/api/films"); // endre til "film" fra "films" for å få det til å feile
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseData: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
   }, [fetchMoviesHandler]);

  // function fetchMoviesHandler() { // Kan sette "async function", og så bruke "await" bak hver promise.
  //   fetch("https://swapi.dev/api/films")
  //     .then((response) => { // Can legge på catch etter then for å håndtere feil
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const transformedMovies = data.results.map((movieData) => {
  //         return { id: movieData.episode_id, title: movieData.title, openingText: movieData.opening_crawl, releaseData: movieData.release_date };
  //       });
  //       setMovies(transformedMovies);
  //     });
  // }
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  //];

  let content = <p>Found no movies</p>;

  if(movies.length > 0){
    content = <MoviesList movies={movies} />
  }

  if(error) {
    content = <p>{error}</p>
  }

  if(isLoading) {
    content = <p>Loading...</p>
  }

  // Alternativt: 
  // <section>
  //       {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
  //       {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
  //       {isLoading && <p>Loading...</p>}
  //       {!isLoading && error && <p>{error}</p>}
  //     </section>

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
