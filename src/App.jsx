/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import Box from "./components/Box";
import WatchedSummary from "./components/WatchedSummary";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import WatchedMoviesList from "./components/WatchedMoviesList";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const url = `http://www.omdbapi.com/?apikey=ef10ac66&s=${query}`;

  const controller = new AbortController();

  async function getMovieData() {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error("Something Went Wrong");
      const data = await res.json();

      if (data.Response === "False") throw new Error("Movie Not Found");

      setMovies(data.Search);
      setLoading(false);
      setError("");
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!query.length) {
      setError("");
      setMovies([]);
      return;
    }
    getMovieData();

    return function () {
      controller.abort();
    };
  }, [query]);

  function handleClose() {
    setSelectedId(null);
  }

  function handleAddWatched(newMovie) {
    setWatched((watched) => [...watched, newMovie]);
  }

  function handleSelectedId(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleRemove(id) {
    setWatched((watched) =>
      watched.filter((watchedMovie) => watchedMovie.imdbID !== id)
    );
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          <>
            {loading && <Loader />}
            {errors && <ErrorMessage message={errors} />}
            {!loading && !errors && (
              <MovieList movies={movies} handleSelectedId={handleSelectedId} />
            )}
          </>
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              handleClose={handleClose}
              handleAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                handleRemove={handleRemove}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
