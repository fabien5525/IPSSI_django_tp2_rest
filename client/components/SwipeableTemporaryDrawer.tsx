import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import Link from "next/link";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

interface DrawerProps {
  openDrawer: boolean;
  setOpenDrawer: (open: boolean) => void;
}

const SwipeableTemporaryDrawer = ({
  openDrawer,
  setOpenDrawer,
}: DrawerProps) => {
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpenDrawer(open);
    };

  return (
    <SwipeableDrawer
      anchor="left"
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
      onOpen={() => setOpenDrawer(true)}
    >
      <Box
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <ListItem disablePadding>
            <Link href="/tableau">
              <ListItemButton>
                <ListItemIcon>
                  <ViewColumnIcon />
                </ListItemIcon>
                <ListItemText primary="Tableau" />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/ticket">
              <ListItemButton>
                <ListItemIcon>
                  <ConfirmationNumberIcon />
                </ListItemIcon>
                <ListItemText primary="Tickets" />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Divider />
      </Box>
    </SwipeableDrawer>
  );
};

export default SwipeableTemporaryDrawer;
