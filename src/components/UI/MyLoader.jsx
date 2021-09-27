import React, { useEffect, useState } from 'react';
import { Spinner } from "react-bootstrap";

const MyLoader = ({ isLoading }) => {
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(true), 750);

    return () => clearTimeout(timer);
  }, []);

  if (showLoader && isLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  return null;
};

export default MyLoader;
