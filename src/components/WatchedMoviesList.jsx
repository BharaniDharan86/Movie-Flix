/* eslint-disable react/prop-types */
import WatchedMovie from "./WatchedMovie";
function WatchedMoviesList({ watched, handleRemove }) {
  return (
    <ul className="list">
      {watched?.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          handleRemove={handleRemove}
        />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
