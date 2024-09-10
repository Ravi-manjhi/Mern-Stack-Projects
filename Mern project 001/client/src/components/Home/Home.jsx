import React from "react";
import { Container, Grow, Grid } from "@mui/material";
import Post from "../post/post";
import Form from "../form/Form";

function Home() {
  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xm={12} sm={7}>
            <Post />
          </Grid>
          <Grid item xm={12} sm={4}>
            <Form />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
