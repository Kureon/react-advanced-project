import { EventForm } from "../components/EventForm";
import { Heading } from "@chakra-ui/react";

export const NewEventPage = () => {
  return (
    <>
      <Heading>Create new event</Heading>
      <EventForm />
    </>
  );
};
