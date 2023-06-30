import {
  Button,
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import State from "../../models/State";
import dynamic from "next/dynamic";
import Ticket from "../../models/Ticket";

interface EditTicketModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  states: State[];
  updateTickets: () => void;
  ticket: Ticket;
}

interface Message {
  type: "success" | "error";
  message: string;
}

const CustomEditor = dynamic(() => import("../CustomEditor"), {
  ssr: false,
});

const EditTicketModal = ({
  open,
  setOpen,
  states,
  ticket,
  updateTickets,
}: EditTicketModalProps) => {
  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description);
  const [state, setState] = useState<State | undefined>();
  const [message, setMessage] = useState<Message>({
    type: "success",
    message: "",
  });

  useEffect(() => {
    setTitle(ticket.title);
    setDescription(ticket.description);
    if (states.length > 0) {
      const myState = states.find((state) => state.id === ticket.state);
      if (myState) {
        setState(myState);
      }
    }
  }, [states, ticket]);

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

    if (
      !URL ||
      !title ||
      title === "" ||
      !description ||
      description === "" ||
      !state
    ) {
      setMessage({
        type: "error",
        message: !URL ? "Problème d'url" : "Veuillez remplir tous les champs",
      });
      !URL && console.error("NEXT_PUBLIC_NEXT_API_URL is not defined", URL);
      return;
    }

    fetch(`${URL}/tickets/${ticket.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + localStorage?.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        description: description,
        state: state.id,
      }),
    }).then((res) => {
      if (res.ok) {
        updateTickets();
        setOpen(false);
        resetMessage();
      } else {
        setMessage({
          type: "success",
          message: "Une erreur est survenue lors de l'édition du ticket",
        });
      }
    });
  };

  const handleDelete = () => {
    const URL = process.env.NEXT_PUBLIC_NEXT_API_URL;

    if (!URL) {
      console.error("NEXT_PUBLIC_NEXT_API_URL is not defined", URL);
      return;
    }

    console.log("url", URL, ticket.id);

    fetch(`${URL}/tickets/${ticket.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + localStorage?.getItem("token"),
      },
      body: JSON.stringify({
        id: ticket.id,
      }),
    }).then((res) => {
      console.log("aled", res);
      if (res.ok) {
        updateTickets();
        setOpen(false);
        resetMessage();
      } else {
        setMessage({
          type: "success",
          message: "Une erreur est survenue lors de la suppression du ticket",
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
            Edition ticket
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
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div
              style={{
                minHeight: "200px",
              }}
            >
              <CustomEditor value={description} setValue={setDescription} />
            </div>
            {state && (
              <FormControl>
                <InputLabel id="demo-simple-select-helper-label">
                  État
                </InputLabel>
                <Select
                  value={state.name}
                  label="Etat"
                  onChange={(e) => {
                    const newState = states.find(
                      (state) => state.name === e.target.value
                    );
                    if (newState) {
                      setState(newState);
                    }
                  }}
                >
                  {states.map((myState: State, index) => (
                    <MenuItem value={myState.name} key={`state-${index}`}>
                      {myState.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
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
              <Button
                onClick={handleDelete}
                variant="contained"
                style={{
                  backgroundColor: "red",
                  maxWidth: "fit-content",
                }}
              >
                Supprimer
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

export default EditTicketModal;
