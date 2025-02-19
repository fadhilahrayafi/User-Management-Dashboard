import UserTable from "../components/UserTable";
import { Box, Heading } from "@chakra-ui/react";

function Dashboard() {

  return (
    <Box p={5}>
        <Heading mb={4} color="#F7D9C4">User Data</Heading>
        <UserTable/>
    </Box>
  );
}

export default Dashboard;