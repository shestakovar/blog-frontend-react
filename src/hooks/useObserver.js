import { useEffect, useRef } from 'react';

export const useObserver = (lastElement, isLoaded, canLoad, callback) => {
  const observer = useRef();
  useEffect(() => {
    if (!isLoaded) return;
    if (observer.current) observer.current.disconnect()
    let cb = function (entries, observer) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(lastElement.current)
  }, [isLoaded])
}
