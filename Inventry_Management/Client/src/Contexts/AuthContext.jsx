import React, { createContext, useContext, useEffect ,useState} from 'react'
//import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = ()=> useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    //const [user, setUser] = useState(null);
    //const navigate = useNavigate();
  

    useEffect(()=>{
      const storeData = JSON.parse(localStorage.getItem('user_data'));
       if(storeData){
        const { userToken, user } = storeData;
        setToken(userToken);
        setUserData(user);
        setIsAuthenticated(true)
       }
    },[]);

    const login =(newToken, newData)=>{
        localStorage.setItem(
            'user_data',
            JSON.stringify({ userToken: newToken, user: newData }),
        );
        setToken(newToken);
        setUserData(newData);
        setIsAuthenticated(true);
    };

    const logout=()=>{
      localStorage.removeItem('user_data');
      setToken(null);
      setUserData(null);
      setIsAuthenticated(false)
      //navigate('/login');
    }

  return(
    <AuthContext.Provider value={{token, isAuthenticated, login,logout,userData}}>
    { children }
  </AuthContext.Provider>
  ) 
  

}
