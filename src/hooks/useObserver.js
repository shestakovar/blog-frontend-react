import { useEffect, useRef } from 'react';

export const useObserver = (lastElement, isLoading, canLoad, callback) => {
  const observer = useRef();
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false }
  }, [])
  useEffect(() => {
    if (isLoading) return;
    let cb = function (entries, observer) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };
    if (isMounted.current) {
      observer.current = new IntersectionObserver(cb);
      observer.current.observe(lastElement.current);
      return () => {
        if (observer.current) observer.current.disconnect()
      }
    }
  }, [isLoading])
}
