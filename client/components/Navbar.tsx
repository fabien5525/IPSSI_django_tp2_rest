import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface NavbarProps {
  setOpenDrawer: (open: boolean) => void;
}

const Navbar = ({ setOpenDrawer }: NavbarProps) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage) {
      setToken(localStorage.getItem("token") ?? null);
    }
  }, []);

  const handleDeconnexion = () => {
    if (localStorage) {
      localStorage.removeItem("token");
      setToken(null);
      router.push("/connexion");
    }
  };

  return (
    <AppBar position="static">
      <Toolbar
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => token && setOpenDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        {token && (
          <>
            <Link href="/projet">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Projets
              </Typography>
            </Link>
            <Link href="/utilisateur">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Utilisateurs
              </Typography>
            </Link>
          </>
        )}
        {token === null ? (
          <Link
            href="/connexion"
            style={{
              marginLeft: "auto",
            }}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Connexion
            </Typography>
          </Link>
        ) : (
          <Button
            onClick={handleDeconnexion}
            style={{
              marginLeft: "auto",
              color: "white",
            }}
          >
            Se déconnecter
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
