import { useEffect, useState } from "react";
import {
  Flex,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchUsers, deleteUser } from "../redux/slices/userSlice";
import EditUserModal from "./EditUserModal";

interface User {
    id: number;
    name: string;
    email: string;
    company: { name: string };
  }

const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCompany, setSelectedCompany] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = selectedCompany ? user.company.name === selectedCompany : true;
    return matchesSearch && matchesCompany;
  });

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Flex direction="column" gap={4}>
      <Flex gap={4}>
        <Input
          border="2px"
          borderColor="#C9E4DE"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Select border="2px" borderColor="#C9E4DE" placeholder="Filter by company" onChange={handleFilter}>
          {Array.from(new Set(users.map(user => user.company.name))).map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
        </Select>
        <Button bgColor="#F2C6DE" color="white" onClick={() => {setSelectedCompany(""); setSearchTerm("")}}>
           Reset 
        </Button>
      </Flex>

      <TableContainer>
        <Table variant="simple">
          <Thead bgColor="#DBCDF0">
            <Tr>
              <Th textAlign="center">ID</Th>
              <Th textAlign="center">Name</Th>
              <Th textAlign="center">Email</Th>
              <Th textAlign="center">Company</Th>
              <Th textAlign="center">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredUsers.map((user) => (
              <Tr key={user.id}>
                <Td textAlign="center" bgColor="#FAEDCB">{user.id}</Td>
                <Td bgColor="#C9E4DE">{user.name}</Td>
                <Td bgColor="#C9E4DE">{user.email}</Td>
                <Td bgColor="#C9E4DE">{user.company?.name}</Td>
                <Td bgColor="#FAEDCB"  textAlign="center">
                  <Button bgColor="#C6DEF1" color="white" onClick={() => handleEdit(user)} mr={2}>
                    Edit
                  </Button>
                  <Button bgColor="#F2C6DE" color="white" onClick={() => handleDelete(user.id)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <EditUserModal isOpen={isOpen} onClose={onClose} user={selectedUser} setUser={setSelectedUser} />
    </Flex>
  );
};

export default UserTable;