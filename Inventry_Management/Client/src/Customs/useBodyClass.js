import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useBodyClass = (className) => {
  const location = useLocation();

  useEffect(() => {
    const body = document.body;

    const applyClass = () => {
      if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/logouting') {
        body.classList.add(className);
      } else {
        body.classList.remove(className);
      }
    };

    applyClass();


    return () => {
      body.classList.remove(className);
      applyClass();
    };
  }, [location, className]);
};

export default useBodyClass;