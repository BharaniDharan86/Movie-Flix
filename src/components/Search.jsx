import { useEffect, useRef } from "react";

/* eslint-disable react/prop-types */
export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(() => {
    function callback(e) {
      inputEl.current.focus();
    }

    document.addEventListener("keydown", callback);
  });
  return (
    <input
      ref={inputEl}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
