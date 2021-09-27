import React, { FC } from 'react'
import MyLoader, { MyLoaderProps } from "./MyLoader";
import MyError, { MyErrorProps } from "./MyError";

type LoaderErrorProps = MyLoaderProps & MyErrorProps;

const LoaderError: FC<LoaderErrorProps> = ({ isLoading, error, closeError }) => {
  return (
    <>
      <MyError error={error} closeError={closeError} />
      <MyLoader isLoading={isLoading} />
    </>
  )
}

export default LoaderError;
