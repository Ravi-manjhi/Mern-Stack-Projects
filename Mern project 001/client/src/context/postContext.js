import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPost,
  createPostReducer,
  updatePostReducer,
} from "../reducer/postReducer";

const PostContext = React.createContext();

const initalValue = {
  creator: "",
  title: "",
  message: "",
  tags: "",
  selectedFile: "",
};

const PostContextProvider = ({ children }) => {
  const [formData, setFormData] = useState(initalValue);
  const [message, setMessage] = useState("");
  const { value } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (currentId) {
      setFormData(value.find((el) => el._id === currentId));
    }
  }, [currentId, value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePostReducer({
          id: currentId,
          data: {
            ...formData,
            name: user?.result?.name,
          },
        })
      );
      setMessage("Update Post");
      setTimeout(() => {
        setCurrentId(null);
        setFormData(initalValue);
        setMessage("");
        dispatch(fetchPost());
      }, 2000);
    } else {
      dispatch(
        createPostReducer({
          ...formData,
          name: user?.result?.name,
        })
      );
      setFormData(initalValue);
      setTimeout(() => {
        dispatch(fetchPost());
      }, 1000);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "tags") {
      setFormData({ ...formData, [e.target.name]: e.target.value.split(",") });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <PostContext.Provider
      value={{
        currentId,
        setCurrentId,
        message,
        handleSubmit,
        formData,
        setFormData,
        initalValue,
        handleChange,
        user,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  return useContext(PostContext);
};

export default PostContextProvider;
