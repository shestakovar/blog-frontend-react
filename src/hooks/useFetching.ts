import { useState, useRef, useEffect } from 'react';
import { excToMessage } from '../utils/error';

type TFetchingCallback = (...args: any[]) => void;

export const useFetching = (callback: TFetchingCallback) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetching = async (...args: any[]) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (e) {
      setError(excToMessage(e));
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  }

  const clearError = () => {
    setError('');
  };

  return [fetching, isLoading, error, clearError];
}
