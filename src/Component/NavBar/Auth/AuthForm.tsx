import { login } from "../../../Api/Auth";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Login from "../../../Interface/Login";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";


const AuthForm = () => {
  const color = red[500];
  const [inputError, setInputError] = useState<Login | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    if (data.get("email") || data.get("password")) {
      login(data.get("email") as string, data.get("password") as string)
        .then((response) => {
          if (response.status == 200) {
            navigate("/espaceclient");
          } else if (response.status == 401) {
            setFormError(response.data.message);
          } else if (response.status == 422) {
            const { password, mail }: Login = response.data;
            const loginInterface: Login = {
              password: password,
              mail: mail,
            };
            setInputError(loginInterface);
            setFormError(null);
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      setFormError("Tous les champs sont obligatoires");
    }
  };

  return (
    <div className="loginWrapper">
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Me connecter
            </Typography>
            <Typography component="h3" my={2} color={color}>
              {formError}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adresse email"
                name="email"
                autoComplete="email"
                autoFocus
                helperText={inputError?.mail}
                error={Boolean(inputError?.mail)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={inputError?.password}
                error={Boolean(inputError?.password)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="error"
              >
                Connexion
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2" style={{ textDecoration: 'none', color: 'black', textEmphasis: '#f13d3d'}}>
                    {"Vous n'avez pas de compte? Enregistrez-vous!"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default AuthForm;