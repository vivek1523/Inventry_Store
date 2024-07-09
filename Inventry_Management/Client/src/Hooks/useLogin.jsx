import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext.jsx";
import { message } from "antd";

const useLogin = () => {
  const {login} = useAuth();
  const [error, setError] = useState(null);
  const [loading,setLoading] = useState(null);

  const loginUser = async(values)=>{
     
     try {
      setError(null);
      setLoading(true)
      const res = await fetch('http://localhost:4000/api/auth/login',{
        method:'POST',
        headers:{
           'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      });

      const data = await res.json();
      if(res.status === 200){
        message.success(data.message);
        login(data.token,data.user);
      }else {
        setError(new Error(data.message));
        message.error(data.message);
      }

     } catch (error) {
      setError(error);
      message.error("Login failed: " + error.message);
     }finally{
      setLoading(false);
     }
  }

  return { loading, error, loginUser };
}

export default useLogin
