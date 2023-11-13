import { EventForm } from "./EventForm";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export const NewEvent = ({ isModalOpen, closeModal }) => {
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EventForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
