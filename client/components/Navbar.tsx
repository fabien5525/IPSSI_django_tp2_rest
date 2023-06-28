import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

interface NavbarProps {
  setOpenDrawer: (open: boolean) => void;
}

const Navbar = ({ setOpenDrawer }: NavbarProps) => {
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
          onClick={() => setOpenDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
