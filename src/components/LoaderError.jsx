import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap';

const LoaderError = ({ isLoading, error }) => {
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(true), 750);

    return () => clearTimeout(timer);
  });

  if (error)
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
