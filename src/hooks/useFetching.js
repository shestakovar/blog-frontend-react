import { useState, useRef, useEffect } from 'react';
import { excToMessage } from '../utils/error';

export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false }
  }, []);

  const fetching = async (...args) => {
    try {
      setIsLoading(true);
      await callback(...args);
    }
    catch (e) {
      setError(excToMessage(e));
    }
    finally {
      if (isMounted.current) setIsLoading(false);
    }
  }

  const clearError = () => { setError('') };

  return [fetching, isLoading, error, clearError];
}
