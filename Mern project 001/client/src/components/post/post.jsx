import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Grid } from "@mui/material";
import { fetchPost } from "../../reducer/postReducer";
import PostCard from "./postCard/postCard";
import "./post.css";

function Post() {
  const { value } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);

  return value.length === 0 ? (
    <Grid className="loading" container alignItems="center">
      <CircularProgress />
    </Grid>
  ) : (
    <Grid className="container" container alignItems="stretch" spacing={3}>
      {value.map((el) => {
        return (
          <Grid className="cards" key={el._id} item xs={12} sm={6}>
            <PostCard post={el} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Post;
