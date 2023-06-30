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

interface AddTicketModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  states: State[];
  updateTickets: () => void;
}

interface Message {
  type: "success" | "error";
  message: string;
}

const CustomEditor = dynamic(() => import("../../components/CustomEditor"), {
  ssr: false,
});

const AddTicketModal = ({
  open,
  setOpen,
  states,
  updateTickets,
}: AddTicketModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(" ");
  const [state, setState] = useState<State | undefined>(undefined);
  const [message, setMessage] = useState<Message>({
    type: "success",
    message: "",
  });

  useEffect(() => {
    if (states.length > 0) {
      setState(states[0]);
    }
  }, [states]);

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

    fetch(`${URL}/tickets/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + localStorage?.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        description: description,
        state: state.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          updateTickets();
          setOpen(false);
          resetMessage();
          setTitle("");
          setDescription("");
          setState(states[0]);
        } else {
          setMessage({
            type: "success",
            message: "Une erreur est survenue lors de l'auout du ticket",
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
            Add Ticket
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
            <Button type="submit">Créer</Button>
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

export default AddTicketModal;
