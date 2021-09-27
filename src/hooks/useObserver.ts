import { MutableRefObject, useEffect, useRef } from 'react';

export const useObserver = (lastElement: MutableRefObject<HTMLDivElement | null>, isLoading: boolean,
                            canLoad: boolean, callback: () => void) => {
  const observer = useRef<IntersectionObserver>();
  const isMounted = useRef<boolean>(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    if (isLoading) return;
    let cb = function (entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };
    if (isMounted.current && lastElement.current) {
      observer.current = new IntersectionObserver(cb);
      observer.current.observe(lastElement.current);
      return () => {
        if (observer.current) observer.current.disconnect()
      }
    }
  }, [isLoading])
}
