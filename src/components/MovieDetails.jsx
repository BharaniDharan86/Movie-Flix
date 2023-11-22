/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import StarRating from "../StarRating";
import Loader from "./Loader";

function MovieDetails({ selectedId, handleClose, handleAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setRating] = useState(null);
  const isWatched = watched.find((movie) => movie.imdbID === selectedId);

  async function getMovieById() {
    try {
      setLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=ef10ac66&i=${selectedId}`
      );

      const data = await res.json();

      setMovie(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovieById();
  }, [selectedId]);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAddMovie() {
    const newMovie = {
      imdbID: selectedId,
      title,
      userRating,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
    };

    handleAddWatched(newMovie);
    handleClose();
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={handleClose}>
              &larr;
            </button>

            <img src={poster} alt={`Poster of ${movie} movie`} />

            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released}</p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating}IMDB rating
              </p>
            </div>
          </header>
          <section>
            {isWatched ? (
              <p>You already watched and rated this movie..</p>
            ) : (
              <>
                <StarRating maxRating={10} setTest={setRating} />

                <button className="btn-add" onClick={() => handleAddMovie()}>
                  + Add to watchlist
                </button>
              </>
            )}
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed By : {director}</p>
          </section>
        </div>
      )}
    </>
  );
}

export default MovieDetails;
