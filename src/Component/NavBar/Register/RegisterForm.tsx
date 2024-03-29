import * as React from "react";
import { red } from "@mui/material/colors";
import { register } from "../../../Api/Auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Register from "../../../Interface/Register";
import background from "../../../../src/registerpicture.jpg";

const RegisterForm = () => {
  const navigate = useNavigate();
  const color = red[500];
  const [inputError, setInputError] = useState<Register | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    if (
      data.get("email") ||
      data.get("lastname") ||
      data.get("firstname") ||
      data.get("phone") ||
      data.get("password")
    ) {
      register(
        data.get("lastname") as string,
        data.get("firstname") as string,
        data.get("email") as string,
        data.get("password") as string,
        data.get("phone") as string
      ).then((response) => {
        if (response.status == 201) {
          navigate("/login");
        } else if (response.status == 422) {
          const { password, mail, phone, firstname, lastname }: Register =
            response.data;
          const registerInterface: Register = {
            password: password,
            mail: mail,
            firstname: firstname,
            phone: phone,
            lastname: lastname,
          };
          setInputError(registerInterface);
          setFormError(null);
        }
      });
    } else {
      setFormError("Tous les champs sont obligatoires");
    }
  };

  return (
    <div className="registerForm">
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
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
              Créer mon compte
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
                id="lastname"
                label="Nom"
                name="lastname"
                autoFocus
                helperText={inputError?.lastname}
                error={Boolean(inputError?.lastname)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="Prénom"
                name="firstname"
                autoFocus
                helperText={inputError?.firstname}
                error={Boolean(inputError?.firstname)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adresse email"
                name="email"
                autoFocus
                helperText={inputError?.mail}
                error={Boolean(inputError?.mail)}
              />
              <TextField
                margin="normal"
                fullWidth
                id="phone"
                label="Téléphone"
                name="phone"
                autoFocus
                helperText={inputError?.phone}
                error={Boolean(inputError?.phone)}
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
                Créer mon compte
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2" style={{ textDecoration: 'none', color: 'black', textEmphasis: '#f13d3d'}}>
                    {"Vous avez déjà un compte? Me connecter"}
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

export default RegisterForm;