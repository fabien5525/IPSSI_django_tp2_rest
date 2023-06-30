import { Container } from "@mui/material";
import { NextPage } from "next";
import UsersTable from "../../components/user/UserTable";

const Utilisateurs: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <h1>Utilisateurs</h1>
      <UsersTable />
    </Container>
  );
};

export default Utilisateurs;
