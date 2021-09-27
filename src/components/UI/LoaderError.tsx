import React, { useState, useEffect, FC } from 'react'
import { Alert, Spinner } from 'react-bootstrap';

interface propsWithoutError {
  isLoading: boolean;
  error: never;
  closeError: never;
}

interface propsWithError {
  isLoading: boolean;
  error: string | object | null;
  closeError?: never;
}

interface propsWithCloseError {
  isLoading: boolean;
  error: string | object | null;
  closeError: () => void;
}

type LoaderErrorProps = propsWithCloseError | propsWithError | propsWithoutError;

const LoaderError:FC<LoaderErrorProps> = ({ isLoading, error, closeError }) => {

  const [showLoader, setShowLoader] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(true), 750);

    return () => clearTimeout(timer);
  }, []);

  if (error)
    if (typeof error === 'object')
      if (closeError)
        return (
          <div className="errors">
            <Alert variant="danger" onClose={() => closeError()} dismissible>
              {Object.entries(error).map(([k, v]) => <p key={k}>{k} : {v}</p>)}
            </Alert>

          </div>
        )
      else
        return (
          <div className="errors">
            <Alert variant="danger">
              {Object.entries(error).map(([k, v]) => <p key={k}>{k} : {v}</p>)}
            </Alert>

          </div>
        )
    else if (closeError)
      return (
        <Alert variant="danger" onClose={() => closeError()} dismissible>{error}</Alert>
      )
    else
      return (
        <Alert variant="danger">{error}</Alert>
      )
  if (showLoader && isLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  return null;
}

export default LoaderError;
