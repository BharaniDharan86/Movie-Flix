/* eslint-disable react/prop-types */

import { useState } from "react";

/* eslint-disable react/jsx-key */
const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

const StarStyle = {
  height: "20px",
  width: "20px",
  cursor: "pointer",
  display: "block",
};

function StarRating({ maxRating = 5, color = "#fcc419", setTest }) {
  const textStyle = {
    lineHeight: "1",
    margin: "0px",
    color,
    fontSize: `20px`,
  };
  const [star, setStar] = useState(0);
  const [tempStar, setTempStar] = useState(0);

  function handleStar(index) {
    setStar(index + 1);
    setTest(index + 1);
  }

  function handleHoverIn(index) {
    setTempStar(index + 1);
  }

  function handleHoverOut() {
    setTempStar(0);
  }

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            handleStar={handleStar}
            handleHoverIn={handleHoverIn}
            handleHoverOut={handleHoverOut}
            full={tempStar ? tempStar >= i + 1 : star >= i + 1}
            index={i}
            key={i}
            color={color}
          />
        ))}
      </div>
      <p style={textStyle}>{star ? star : tempStar || ""}</p>
    </div>
  );
}

function Star({
  handleStar,
  index,
  full,
  handleHoverIn,
  handleHoverOut,
  color,
}) {
  return (
    <span
      role="button"
      onClick={() => handleStar(index)}
      onMouseEnter={() => {
        handleHoverIn(index);
      }}
      onMouseLeave={handleHoverOut}
      style={StarStyle}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

export default StarRating;
