import { React, useState } from "react";
// import { useLoaderData } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

// Load page and data
// export const loader = async () => {
//   const users = await fetch("http://localhost:3000/users");
//   const events = await fetch("http://localhost:3000/events");
//   const categories = await fetch("http://localhost:3000/categories");

//   return {
//     events: await events.json(),
//     categories: await categories.json(),
//   };
// };

export const EventPage = ({ events }) => {
  // const { users, events, categories } = useLoaderData();

  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();

  const openEditForm = (event) => {
    setSelectedEvent(event);
    setEditFormOpen(true);
  };

  return (
    <>
      Test {event}
      {events.map((event) => (
        <div key={event.id}>
          <Heading>{event.title}</Heading>
        </div>
      ))}
    </>
  );
};
