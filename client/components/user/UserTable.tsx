import * as React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import User from "../../models/User";
import EditUserModal from "./EditUserModal";

const UsersTable = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [userEdit, setUserEdit] = useState<User | undefined>(undefined);

  const updateUsers = () => {
    const URL = process.env.NEXT_PUBLIC_NEXT_API_URL;

    if (!URL) {
      console.error("NEXT_PUBLIC_NEXT_API_URL is not defined");
      return;
    }

    fetch(`${URL}/users/`, {
      headers: {
        "content-type": "application/json",
        Authorization: "Token " + localStorage?.getItem("token"),
      },
    }).then((response) => {
      if (response.status === 403) {
        router.push("/");
        return;
      }

      if (!response.ok) {
        console.error("Error while fetching users");
        return;
      }
      response.json().then((data) => {
        const newUsers = data.data as User[];
        setUsers(newUsers);
      });
    });
  };

  useEffect(() => {
    updateUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (row: User) => {
    setUserEdit(row);
    setOpenEditModal(true);
  };

  const handleDelete = (row: User) => {
    const URL = process.env.NEXT_PUBLIC_NEXT_API_URL;

    if (!URL) {
      console.error("NEXT_PUBLIC_NEXT_API_URL is not defined");
      return;
    }

    fetch(`${URL}/users/${row.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage?.getItem("token"),
      },
    }).then((response) => {
      if (!response.ok) {
        console.error("Error while deleting user");
        return;
      }
      updateUsers();
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.is_staff ? "Oui" : "Non"}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => handleEdit(row)}
                  style={{
                    marginRight: "10px",
                  }}
                >
                  Modifier
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleDelete(row)}
                  style={{
                    backgroundColor: "red",
                  }}
                >
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {userEdit !== undefined && (
        <EditUserModal
          open={openEditModal}
          setOpen={setOpenEditModal}
          user={userEdit}
          updateUsers={updateUsers}
        />
      )}
    </TableContainer>
  );
};

export default UsersTable;
