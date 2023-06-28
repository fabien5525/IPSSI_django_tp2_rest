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
import { useState } from "react";
import State from "../../models/State";

interface AddTicketModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  states: State[];
}

const AddTicketModal = ({ open, setOpen, states }: AddTicketModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState<"">(undefined);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 


    const url = process.env.API_URL;

    if (
      !url ||
      !title ||
      title === "" ||
      !description ||
      description === "" ||
      !state
    ) {
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }

    fetch(`${url}/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "title": title,
        "description": description,
        "state": state?.id,
      }),
    }).then((res) => {
      if (res.status === 201) {
        setOpen(false);
      } else {
        res.json().then((data) => {
          setErrorMessage(data.message);
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
            <TextField label="Title" variant="outlined" fullWidth />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
            <FormControl>
              <InputLabel id="demo-simple-select-helper-label">État</InputLabel>
              <Select
                value={state}
                label="Etat"
                onChange={(e) => setState(e.target.value as State)}
              >
                {states.map((myState : State, index) => (
                  <MenuItem value={myState.name} key={`state-${index}`}>
                    {myState.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button type="submit">Créer</Button>
          </form>

          {errorMessage && (
            <FormHelperText error>{errorMessage}</FormHelperText>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddTicketModal;
