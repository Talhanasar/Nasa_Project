import { useLenis } from 'lenis/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 0 }); // Scroll to the top with no duration for instant scroll
    }
  }, [pathname, lenis]);

  return null;
}

export default ScrollToTop;
