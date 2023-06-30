import {
  Button,
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  TextField,
  FormHelperText,
  Checkbox,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import User from "../../models/User";

interface EditUserModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  updateUsers: () => void;
  user: User;
}

interface Message {
  type: "success" | "error";
  message: string;
}

const EditUserModal = ({
  open,
  setOpen,
  user,
  updateUsers,
}: EditUserModalProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [is_staff, setIs_staff] = useState(false);
  const [message, setMessage] = useState<Message>({
    type: "success",
    message: "",
  });

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setIs_staff(user.is_staff);
  }, [user]);

  const resetMessage = () => {
    setMessage({
      type: "success",
      message: "",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    resetMessage();

    const URL = process.env.NEXT_PUBLIC_NEXT_API_URL;

    if (!URL || !username || !email) {
      setMessage({
        type: "error",
        message: !URL ? "Problème d'url" : "Veuillez remplir tous les champs",
      });
      !URL && console.error("NEXT_PUBLIC_NEXT_API_URL is not defined", URL);
      return;
    }

    console.log("update user", user);

    fetch(`${URL}/users/${user.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage?.getItem("token"),
      },
      body: JSON.stringify({
        username: username,
        email: email,
        is_staff: is_staff,
      }),
    }).then((res) => {
      if (res.ok) {
        console.log("user updated")
        updateUsers();
        setOpen(false);
        resetMessage();
      } else {
        setMessage({
          type: "error",
          message: "Une erreur est survenue lors de l'édition du ticket",
        });
      }
    });
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80dvw",
            aspectRatio: "16/9",
            backgroundColor: "white",
            padding: "4rem",
            borderRadius: "1rem",
          }}
        >
          <Typography
            variant="h4"
            style={{
              marginBottom: "1rem",
            }}
          >
            Edition User
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <TextField
              label="Username"
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "fit-content",
                }}
              >
                <Typography variant="h6">Admin</Typography>
                <Checkbox
                  checked={is_staff}
                  onChange={(e) => setIs_staff(e.target.checked)}
                />
              </div>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                style={{
                  maxWidth: "fit-content",
                }}
              >
                Modifier
              </Button>
            </div>
          </form>
          {message && (
            <FormHelperText error={message.type === "error"}>
              {message.message}
            </FormHelperText>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditUserModal;
