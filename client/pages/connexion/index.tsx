import { Button, Container, FormHelperText, TextField } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import Credentials from "../../models/Credentials";
import { useRouter } from "next/router";

const Connexion: NextPage = () => {
  const router = useRouter();
  const [inscription, setInscription] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const URL = process.env.NEXT_PUBLIC_NEXT_API_URL;

    if (!URL) {
      console.error("NEXT_PUBLIC_NEXT_API_URL is not defined");
      return;
    }

    if (!username || !password || (inscription && !email)) {
      console.error("Veuillez remplir tous les champs");
      return;
    }

    if (inscription && password !== passwordConfirmation) {
      console.error("Les mots de passe ne sont pas identiques");
      return;
    }

    const urlLogin = inscription ? `${URL}/register` : `${URL}/login`;

    fetch(urlLogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        inscription ? { username, password, email } : { username, password }
      ),
    }).then((response) => {
      if (!response.ok) {
        console.error(
          inscription ? "Error while registering" : "Error while logging in"
        );
        return;
      }
      response.json().then((data) => {
        const credentials = data.data as Credentials;
        localStorage.setItem("token", credentials.token);
        router.push("/tableau").then(() => window.location.reload());
      });
    });
  };

  return (
    <Container maxWidth="sm">
      {!inscription ? (
        <>
          <h1>Connexion</h1>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                width: "100%",
              }}
            >
              <TextField
                label="Nom d'utilisateur"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Mot de passe"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <Button variant="contained" type="submit">
                Se connecter
              </Button>
              <FormHelperText>
                Pas encore de compte ?{" "}
                <a href="#" onClick={() => setInscription(true)}>
                  Inscrivez-vous
                </a>
              </FormHelperText>
            </form>
          </div>
        </>
      ) : (
        <>
          <h1>Inscription</h1>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                width: "100%",
              }}
            >
              <TextField
                label="Nom d'utilisateur"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Mot de passe"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <TextField
                label="Confirmation du mot de passe"
                variant="outlined"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                type="password"
              />
              <Button variant="contained" type="submit">
                {"S'inscrire"}
              </Button>
              <FormHelperText>
                Déjà un compte ?{" "}
                <a href="#" onClick={() => setInscription(false)}>
                  Se connecter
                </a>
              </FormHelperText>
            </form>
          </div>
        </>
      )}
    </Container>
  );
};

export default Connexion;
