import React from 'react'
import MyError from "./MyError";
import MyLoader from "./MyLoader";

const LoaderError = ({ isLoading, error, closeError }) => {
  return (
    <>
      <MyError error={error} closeError={closeError} />
      <MyLoader isLoading={isLoading} />
    </>
  )
}

export default LoaderError;
