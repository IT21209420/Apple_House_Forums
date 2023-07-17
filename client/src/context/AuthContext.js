import { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  //login request
  const loginUser = async (userData) => {
    try {
      const res = await fetch(`http://localhost:9000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      if (!result.error) {
        localStorage.setItem("token", result.jwtToken);
        toast.success(result.token);

        
      } else {
        setError(result.error);
        toast.error(error);
        setError(null);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
   //register request
   const registerUser = async (userData) => {
    try {
        const res = await fetch(`http://localhost:9000/api/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...userData }),
        });
        const result = await res.json();
        if (!result.error) {
          toast.success('User Registered Successfully! Login to continue');
        //   navigate('/login', { replace: true });
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <AuthContext.Provider value={{ loginUser,registerUser }}>
      <ToastContainer autoClose={2000} />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
