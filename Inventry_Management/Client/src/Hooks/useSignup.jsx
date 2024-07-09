import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext.jsx";
import { message } from "antd";

const useSignup = () => {
  const {login} = useAuth();
  const [error, setError] = useState(null);
  const [loading,setLoading] = useState(null);

  const registeredUser = async(values)=>{
     if(values.password !== values.confrimpassword){
      return setError("Password are Not same")
     }
     try {
      setError(null);
      setLoading(true)
      const res = await fetch('https://inventry-store-server.onrender.com/api/auth/signup',{
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
      }else if(res.status === 400){
        setError(new Error(data.message));
      }else{
        message.error("Registration Failed")
      }

     } catch (error) {
       setError(error);
     }finally{
      setLoading(false);
     }
  }
  
  return { loading, error, registeredUser };
}

export default useSignup
