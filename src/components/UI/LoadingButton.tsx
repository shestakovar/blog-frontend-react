import React, { useState, useEffect, FC } from 'react';
import { Button } from 'react-bootstrap';

interface LoadingButtonProps {
  isLoading: boolean;
  loadingText: string;
  text:string;
}

const LoadingButton:FC<LoadingButtonProps> = ({ isLoading, loadingText, text }) => {
  const [showLoading, setShowLoading] = useState<boolean>(false);
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
