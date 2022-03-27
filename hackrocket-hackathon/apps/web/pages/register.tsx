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
import { useRouter } from "next/router";
import { interceptedAxios } from "../intrerceptors";
import { Alert, AlertTitle, Collapse } from "@mui/material";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = React.useState<string | null>();
  const [email, setEmail] = React.useState<string | null>();
  const [password, setPassword] = React.useState<string | null>();
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState<string | null>();
  const [submitting, setSubmitting] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setSubmitting(true);
    const data = { username, email, password };
    if (!username || !email || !password) {
      setError(true);
      setErrorText("Please fill all fields");
      setSubmitting(false);
      return;
    }
    try {
      const req = await interceptedAxios.post(
        "auth/register",
        { ...data },
        { withCredentials: true }
      );
      console.log(req);
      if (req.status === 201) {
        console.log("Created Account");
        router.replace("/login");
      } else {
        console.log(req.data);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorText(error?.response?.data.message);
    }
    setSubmitting(false);
  };

  const checkUsername = async () => {
    if (!username) {
      return;
    }
    try {
      const req = await interceptedAxios.post("auth/check-username", {
        username,
      });
      console.log(req.data);
      if (req.status === 200) {
        setHelperText(req.data?.message);
      }
    } catch (error) {
      console.log(error.response.data);
      setHelperText(error?.response?.data.message);
    }
  };
  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);
  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: 20 }}>
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
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
            onBlur={checkUsername}
            helperText={helperText}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
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
            sx={{ mt: 3, mb: 2, height: 45 }}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Sign up"}
          </Button>
        </Box>
      </Box>
      <Grid container>
        <Grid item xs></Grid>
        <Grid item>
          <NextLink href="/login" passHref>
            <Link href="#" variant="body2">
              {"Already have an account? Sign In"}
            </Link>
          </NextLink>
        </Grid>
      </Grid>
    </Container>
  );
}
