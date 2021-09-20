import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const LoadingButton = ({ isLoading, loadingText, text }) => {
  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setShowLoading(true), 750);
      return () => clearTimeout(timer);
    }
  }, [isLoading])
  return (
    <Button variant="success" type="submit" disabled={isLoading}>
      {showLoading ? loadingText : text}
    </Button>
  )
}

export default LoadingButton;
