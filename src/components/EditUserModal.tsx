import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,
    Button,
  } from "@chakra-ui/react";
  import { useDispatch } from "react-redux";
  import { editUser } from "../redux/slices/userSlice";
  
  interface User {
    id: number;
    name: string;
    email: string;
    company: { name: string };
  }
  
  interface EditUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
    setUser: (user: User) => void;
  }
  
  const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, user, setUser }) => {
    const dispatch = useDispatch();
  
    if (!user) return null;
  
    const handleSave = () => {
      dispatch(editUser(user));
      onClose();
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="#FAEDCB">
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <Input
              border="2px"
              borderColor="white"
              mb={3}
              placeholder="Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <Input
              border="2px"
              borderColor="white"
              mb={3}
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <Input
              border="2px"
              borderColor="white"
              placeholder="Company"
              value={user.company?.name || ""}
              onChange={(e) =>
                setUser({ ...user, company: { ...user.company, name: e.target.value } })
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button bgColor="#C6DEF1" color="white" onClick={handleSave}>
              Save
            </Button>
            <Button bgColor="#F2C6DE" color="white" onClick={onClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default EditUserModal;