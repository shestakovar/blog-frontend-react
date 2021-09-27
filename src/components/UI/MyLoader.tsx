import React, { FC, useEffect, useState } from 'react';
import { Spinner } from "react-bootstrap";

export interface MyLoaderProps {
  isLoading: boolean;
}

const MyLoader: FC<MyLoaderProps> = ({ isLoading }) => {
  const [showLoader, setShowLoader] = useState<boolean>(false);
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
