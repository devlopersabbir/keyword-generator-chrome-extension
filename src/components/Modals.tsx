import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";

interface IModals {
  isOpen: boolean;
  onClose: () => void;
  data: string;
}

const Modals = ({ isOpen, onClose, data }: IModals) => {
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(data);
      toast.success("🚀 Keyword copied🥹");
    } catch (error) {
      toast.error("Fail to copy the keyword!");
    }
  };
  console.log(data);
  return (
    <Modal size="sm" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Keyword</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="lg" fontWeight="500">
            {data}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleCopyClick} colorScheme="green">
            Copy
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Modals;
