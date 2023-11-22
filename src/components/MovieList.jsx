/* eslint-disable react/prop-types */
import Movie from "./Movie";
function MovieList({ movies, handleSelectedId }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          handleSelectedId={handleSelectedId}
        />
      ))}
    </ul>
  );
}

export default MovieList;
