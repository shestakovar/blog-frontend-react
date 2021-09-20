import React, { useState, useEffect } from 'react'
import { Alert, Spinner } from 'react-bootstrap';

const LoaderError = ({ isLoading, error, closeError }) => {
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(true), 750);

    return () => clearTimeout(timer);
  }, []);

  if (error)
    if (typeof error === 'object')
      return (
        <div className="errors">

          <Alert variant="danger" onClose={() => closeError()} dismissible>
            {Object.entries(error).map(([k, v]) => <p>{k} : {v}</p>)}
          </Alert>

        </div>
      )
    else
      return (
        <Alert variant="danger" onClose={() => closeError()} dismissible>{error}</Alert>
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
