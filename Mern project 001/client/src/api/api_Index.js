import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const getPosts = async () => await API.get("/posts");
export const deletePost = async (id) => await API.delete("/posts/" + id);
export const likePost = async (id) =>
  API.patch(`${"/posts/" + id + "/likepost"}`);

export const createPost = async (body) => await API.post("/posts", body);
export const updatePost = (id, body) =>
  API.patch(`${"/posts/" + id}`, { data: body });

// Auth APIs
export const signin = async (formData) => {
  const response = await API.post("/user/signin", formData);
  return response;
};

export const signup = async (formData) => {
  const response = await API.post("/user/signup", formData);
  return response;
};
