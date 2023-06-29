import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import TicketCard from "../../components/TicketCard";
import AddTicketModal from "../../components/ticket/AddTicketModal";
import State from "../../models/State";
import Ticket from "../../models/Ticket";

const Tableau: NextPage = () => {
  const [openAddTicketModal, setOpenAddTicketModal] = useState(false);
  const [loaded, setLoaded] = useState({
    states: false,
    tickets: false,
  });
  const [states, setStates] = useState<State[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const updateTickets = () => {
    const URL = process.env.NEXT_PUBLIC_NEXT_API_URL;

    if (!URL) {
      console.error("NEXT_PUBLIC_NEXT_API_URL is not defined");
      return;
    }

    fetch(`${URL}/states`, { method: "GET" }).then((response) => {
      if (!response.ok) {
        console.error("Error while fetching states");
        return;
      }
      response.json().then((data) => {
        const newStates = data.data as State[];
        setStates(newStates);
        setLoaded((prev) => ({ ...prev, states: true }));
      });
    });
  };

  const updateStates = () => {
    const URL = process.env.NEXT_PUBLIC_NEXT_API_URL;

    if (!URL) {
      console.error("NEXT_PUBLIC_NEXT_API_URL is not defined");
      return;
    }

    fetch(`${URL}/tickets`, { method: "GET" }).then((response) => {
      if (!response.ok) {
        console.error("Error while fetching tickets");
        return;
      }
      response.json().then((data) => {
        const newTickets = data.data as Ticket[];
        setTickets(newTickets);
        setLoaded((prev) => ({ ...prev, tickets: true }));
      });
    });
  };

  useEffect(() => {
    updateStates();
    updateTickets();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginTop: "0px" }}>Tableau</h1>
      {loaded.states && loaded.tickets ? (
        <>
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
            {states.map((state, indexState) => {
              return (
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
                    {state.name}
                  </div>
                  <div>
                    {tickets
                      .filter((ticket) => ticket.state === state.id)
                      .map((ticket, indexTicket) => (
                        <TicketCard
                          key={`ticket-${indexState}-${indexTicket}`}
                          ticket={ticket}
                        />
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="actions">
            <Button
              variant="contained"
              onClick={() => setOpenAddTicketModal(true)}
            >
              <AddIcon /> Ajouter un ticket
            </Button>
          </div>
        </>
      ) : (
        <div>Chargement...</div>
      )}

      <AddTicketModal
        open={openAddTicketModal}
        setOpen={setOpenAddTicketModal}
        states={states}
        updateTickets={updateTickets}
      />
    </div>
  );
};

export default Tableau;
