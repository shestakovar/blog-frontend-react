import { useEffect, useRef } from 'react';

export const useObserver = (lastElement, isLoading, canLoad, callback) => {
  const observer = useRef();
  useEffect(() => {
    if (isLoading) return;
    let cb = function (entries, observer) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(lastElement.current);
    return () => {
      if (observer.current) observer.current.disconnect()
    }
  }, [isLoading])
}
