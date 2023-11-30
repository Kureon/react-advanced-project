import { EventForm } from "../components/EventForm";
import { Heading } from "@chakra-ui/react";

// LOAD DATA
export const loader = async () => {
  const users = await fetch("http://localhost:3000/users");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const NewEventPage = () => {
  return (
    <>
      <Heading>Create new event</Heading>
      <EventForm />
    </>
  );
};
