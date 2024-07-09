import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';


const useBodyClass = (className) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();


  useEffect(() => {
    const body = document.body;

    const applyClass = () => {
      if (!isAuthenticated || ['/', '/login'].includes(location.pathname)) {

        body.classList.add(className);
      } else {
        body.classList.remove(className);
      }
    };

    applyClass();


    return () => {
      body.classList.remove(className);
      //applyClass();
    };
  }, [location, className, isAuthenticated]);
};

export default useBodyClass;