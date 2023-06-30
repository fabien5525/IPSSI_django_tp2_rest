import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import TicketCard from "../../components/TicketCard";
import AddTicketModal from "../../components/ticket/AddTicketModal";
import State from "../../models/State";
import Ticket from "../../models/Ticket";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import EditTicketModal from "../../components/ticket/EditTicketModal";

const Tableau: NextPage = () => {
  const [openAddTicketModal, setOpenAddTicketModal] = useState(false);
  const [openEditTicketModal, setOpenEditTicketModal] = useState(false);
  const [ticketToEdit, setTicketToEdit] = useState<Ticket | undefined>(
    undefined
  );
  const [loaded, setLoaded] = useState({
    states: false,
    tickets: false,
  });
  const [states, setStates] = useState<State[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const updateStates = () => {
    const URL = process.env.NEXT_PUBLIC_NEXT_API_URL;

    if (!URL) {
      console.error("NEXT_PUBLIC_NEXT_API_URL is not defined");
      return;
    }

    fetch(`${URL}/states`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + localStorage?.getItem("token"),
      },
    }).then((response) => {
      console.log(
        "response state",
        response.ok,
        response.status,
        response.statusText
      );
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

  const updateTickets = () => {
    const URL = process.env.NEXT_PUBLIC_NEXT_API_URL;

    if (!URL) {
      console.error("NEXT_PUBLIC_NEXT_API_URL is not defined");
      return;
    }

    fetch(`${URL}/tickets/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + localStorage?.getItem("token"),
      },
    }).then((response) => {
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

  const handleDragTicket = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    // Récupérer l'id du ticket déplacé
    const ticketId = source.index;

    // Récupérer l'id de l'état source
    const oldStateId = source.droppableId;

    // Récupérer l'id de l'état destination
    const newStateId = destination.droppableId;

    if (oldStateId === newStateId) {
      return;
    }

    const URL = process.env.NEXT_PUBLIC_NEXT_API_URL;

    fetch(`${URL}/tickets/${ticketId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + localStorage?.getItem("token"),
      },
      body: JSON.stringify({ state: newStateId }),
    }).then((response) => {
      if (!response.ok) {
        console.error("Error while updating ticket state");
      } else {
        updateTickets();
        console.log("Nouveau state de la TicketCard :", {
          ticketId,
          newStateId,
        });
      }
    });
  };

  const handleClickTicket = (ticket: Ticket) => {
    setOpenEditTicketModal(true);
    setTicketToEdit(ticket);
  };

  return (
    <DragDropContext onDragEnd={handleDragTicket}>
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
              {states.map((state) => {
                return (
                  <Droppable droppableId={`${state.id}`} key={state.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="col"
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
                        {provided.placeholder}
                        <div>
                          {tickets
                            .filter((ticket) => ticket.state === state.id)
                            .map((ticket) => (
                              <Draggable
                                key={ticket.id}
                                draggableId={`${ticket.id}`}
                                index={ticket.id}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    onClick={() => handleClickTicket(ticket)}
                                  >
                                    <TicketCard ticket={ticket} />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                        </div>
                      </div>
                    )}
                  </Droppable>
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
        {ticketToEdit && (
          <EditTicketModal
            open={openEditTicketModal}
            setOpen={setOpenEditTicketModal}
            states={states}
            updateTickets={updateTickets}
            ticket={ticketToEdit}
          />
        )}
      </div>
    </DragDropContext>
  );
};

export default Tableau;
