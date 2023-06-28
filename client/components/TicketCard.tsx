import { Card, CardActions, CardContent, Typography } from "@mui/material";

interface TicketCardProps {
  title: string;
  description: string;
  username: string | null;
}

const TicketCard = (props: TicketCardProps) => {
  const { title, username } = props;
  const description =
    props.description.length > 50
      ? props.description.substring(0, 46) + " ..."
      : props.description;

  return (
    <Card style={{
        marginBottom: "8px",
    }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        {username && (
          <Typography variant="body2" color="text.secondary">
            {username}
          </Typography>
        )}
      </CardActions>
    </Card>
  );
};

export default TicketCard;
