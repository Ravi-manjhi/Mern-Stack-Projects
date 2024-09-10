import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { signInReducer, signUpReducer } from "../reducer/authReducer";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

const initalValue = {
  fName: "",
  lName: "",
  email: "",
  password: "",
  ConfirmPassword: "",
};

const AuthContextProvider = ({ children }) => {
  const [loginMessage, setLoginMessage] = useState("");
  const [newUser, setNewUser] = useState(initalValue);
  const [isSignIn, setIsSignin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignIn) {
      if (newUser.password === newUser.ConfirmPassword) {
        dispatch(signUpReducer({ navigate, newUser }));
      } else {
        setLoginMessage("Password Not Match");
        setTimeout(() => {
          setLoginMessage("");
        }, 3000);
      }
    } else {
      dispatch(signInReducer({ navigate, newUser }));
    }
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <AuthContext.Provider
      value={{
        isSignIn,
        setIsSignin,
        newUser,
        setNewUser,
        handleSubmit,
        handleChange,
        loginMessage,
        navigate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
