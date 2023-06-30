import { Card, CardActions, CardContent, Typography } from "@mui/material";
import Ticket from "../models/Ticket";

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard = (props: TicketCardProps) => {
  const { id, title, user } = props.ticket;
  const tmpDescription = props.ticket.description.replace(
    /<\/?[^>]+(>|$)/g,
    ""
  );
  const description =
    tmpDescription.length > 50
      ? tmpDescription.substring(0, 46) + " ..."
      : tmpDescription;

  return (
    <Card
      style={{
        marginBottom: "8px",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        {user && (
          <Typography variant="body2" color="text.secondary">
            {user}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {id}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default TicketCard;
