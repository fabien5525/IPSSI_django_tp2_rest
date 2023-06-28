import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { NextPage } from "next";
import { useState } from "react";
import TicketCard from "../../components/TicketCard";
import AddTicketModal from "../../components/ticket/AddTicketModal";

interface Ticket {
  id: number;
  title: string;
  state: string;
  description: string;
  project: string;
  user: string;
  createdAt: Date;
}

type SimpleTicket = {
  title: string;
  state: string;
};

const Tableau: NextPage = () => {
  const [openAddTicketModal, setOpenAddTicketModal] = useState(false);

  const [states, setStates] = useState<string[]>([
    "Prêt à dev",
    "Dev en cours",
    "Review de code",
    "Recette interne",
    "Recette client",
    "Go prod",
    "Terminé",
  ]);

  const [tickets, setTickets] = useState<SimpleTicket[]>([
    { title: "Ticket 1", state: "Prêt à dev" },
    { title: "Ticket 2", state: "Dev en cours" },
    { title: "Ticket 2", state: "Dev en cours" },
    { title: "Ticket 3", state: "Review de code" },
    { title: "Ticket 4", state: "Recette interne" },
    { title: "Ticket 5", state: "Recette client" },
    { title: "Ticket 5", state: "Recette client" },
    { title: "Ticket 6", state: "Go prod" },
    { title: "Ticket 7", state: "Terminé" },
  ]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginTop: "0px" }}>Tableau</h1>
      <div
        className="table"
        style={{
          width: `${266 * states.length}px`,
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          marginBottom: "1rem",
        }}
      >
        {states.map((state, indexState) => (
          <div
            className="col"
            key={`state-${indexState}`}
            style={{
              backgroundColor: "#f5f5f5",
              width: "250px",
              paddingInline: "8px",
              borderRadius: "8px",
            }}
          >
            <div
              className="header-col"
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.2rem",
                padding: "8px",
                textTransform: "uppercase",
              }}
            >
              {state}
            </div>
            {tickets
              .filter((ticket) => ticket.state === state)
              .map(({ title }, indexTicket) => (
                <TicketCard
                  key={`ticket-${indexState}-${indexTicket}`}
                  title={title}
                  description=""
                  username={null}
                />
              ))}
          </div>
        ))}
      </div>
      <div className="actions">
        <Button variant="contained" onClick={() => setOpenAddTicketModal(true)}>
          <AddIcon /> Ajouter un ticket
        </Button>
      </div>
      <AddTicketModal
        open={openAddTicketModal}
        setOpen={setOpenAddTicketModal}
        states={[]}
      />
    </div>
  );
};

export default Tableau;
