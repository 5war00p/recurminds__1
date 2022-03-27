import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { default as NextLink } from "next/link";
import { useUserContext } from "../context/userContext";
import { Alert, AlertTitle, Collapse } from "@mui/material";

export default function SignIn() {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const { RequestError, login } = useUserContext();
  const handleSubmit = (event: any) => {
    setSubmitting(true);
    event.preventDefault();
    const data = { username, password };
    if (!username || !password) {
      setError(true);
      setErrorText("Please fill all fields");
      return;
    }
    login(data);
    setSubmitting(false);
  };

  React.useEffect(() => {
    if (RequestError) {
      alert(RequestError);
    }
  }, [RequestError]);

  return (
    <Container component="main" maxWidth="xs">
      <Collapse in={error}>
        <Alert severity="warning">
          <AlertTitle>Wraning!</AlertTitle>
          {errorText}
        </Alert>
      </Collapse>
      <Box
        sx={{
          marginTop: 8,
          padding: 6,
          boxShadow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={submitting}
            sx={{ mt: 3, mb: 2, height: 45 }}
          >
            {submitting ? "Submitting..." : "Sign In"}
          </Button>
        </Box>
      </Box>
      <Grid container>
        <Grid item xs>
          <NextLink href={"/forgest-password"} passHref={true}>
            <Link variant="body2">Forgot password?</Link>
          </NextLink>
        </Grid>
        <Grid item>
          <NextLink href={"/register"} passHref>
            <Link variant="body2">{"Don't have an account? Sign Up"}</Link>
          </NextLink>
        </Grid>
      </Grid>
    </Container>
  );
}
