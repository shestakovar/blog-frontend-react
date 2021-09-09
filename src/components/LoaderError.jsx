import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap';

const LoaderError = ({ isLoading, error }) => {
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(true), 750);

    return () => clearTimeout(timer);
  });

  if (error)
    if (typeof error === 'object')
      return (
        <div className="errors">
          {Object.entries(error).map(([k, v]) =>
            <Alert variant="danger">{k} : {v}</Alert>
          )}
        </div>
      )
    else
      return (
        <Alert variant="danger">{error}</Alert>
      )
  if (showLoader && isLoading)
    return (
      <div>'Загрузка...'</div>
    )
  return null;
}

export default LoaderError;
