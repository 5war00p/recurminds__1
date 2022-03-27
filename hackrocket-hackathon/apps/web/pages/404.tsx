import { Box, Container, Grid, Link, Typography } from "@mui/material";
import Head from "next/head";
import { default as NextLink } from "next/link";
import React from "react";

function NotFound() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Head>
        <title>404 | Social Coding Experience</title>
      </Head>
      <Grid item xs={3}>
        <Typography>
          {
            "Hoo... You're in wrong place :(\nLet Us take you back where you belong"
          }
        </Typography>
        <Typography textAlign={"center"} mt={2}>
          <NextLink href={"/home"} passHref>
            <Link>Click Here</Link>
          </NextLink>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default NotFound;
