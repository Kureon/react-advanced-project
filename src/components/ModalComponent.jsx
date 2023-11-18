import { EditForm } from "./EditForm";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export const ModalComponent = ({
  isOpen,
  onClose,
  users,
  event,
  categories,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit: {event.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditForm
            users={users}
            event={event}
            categories={categories}
            onClose={onClose}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
