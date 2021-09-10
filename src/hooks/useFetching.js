import { useState, useRef, useEffect } from 'react';

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
        if (e?.response?.data?.detail)
            setError(e?.response?.data?.detail);
        else if (e?.response?.data)
            setError(e?.response?.data);
        else
            setError(e.message);
    }
    finally {
        if (isMounted.current) setIsLoading(false);
    }
  }

  return [fetching, isLoading, error];
}
