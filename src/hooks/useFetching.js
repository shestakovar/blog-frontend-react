import { useState } from 'react';

export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
        setIsLoading(false);
    }
  }

  return [fetching, isLoading, error];
}
