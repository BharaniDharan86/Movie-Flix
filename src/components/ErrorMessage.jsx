/* eslint-disable react/prop-types */
function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
}

export default ErrorMessage;
