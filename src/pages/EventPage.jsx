import { React, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ModalComponent } from "../components/ModalComponent";
import { Heading, Button } from "@chakra-ui/react";

// Load page and data
export const loader = async ({ params }) => {
  const users = await fetch("http://localhost:3000/users");
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch("http://localhost:3000/categories");

  return {
    users: await users.json(),
    event: await event.json(),
    categories: await categories.json(),
  };
};

// Format event time
const formatDateTime = (timeString) => {
  const date = new Date(timeString);

  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return formatter.format(date);
};

export const EventPage = () => {
  const { users, event, categories } = useLoaderData();

  const [editOpen, setEditOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();

  const openEdit = (event) => {
    setSelectedEvent(event);
    setEditOpen(true);
  };

  const editClose = () => {
    setEditOpen(false);
  };

  return (
    <>
      <div>
        <img src={event.image} alt={event.title} />

        {categories
          .filter((category) => event.categoryIds.includes(category.id))
          .map((category) => (
            <span key={category.id}>{category.name}</span>
          ))}

        <Heading>{event.title}</Heading>
        <p>{event.description}</p>
        <b>{event.location}</b>
        <p>Start time: {formatDateTime(event.startTime)}</p>
        <p>End time: {formatDateTime(event.endTime)}</p>

        {users
          .filter((user) => event.categoryIds.includes(user.id))
          .map((user) => (
            <div key={user.id}>
              <img src={user.image} alt={user.name} />
              <p>Created by: {user.name}</p>
            </div>
          ))}

        <Button onClick={() => openEdit(event)}>Edit event</Button>

        {editOpen && (
          <>
            <ModalComponent
              isOpen={editOpen}
              onClose={editClose}
              users={users}
              event={event}
              categories={categories}
            />
          </>
        )}
      </div>
    </>
  );
};
