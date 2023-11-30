import { React, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ModalComponent } from "../components/ModalComponent";
import { AlertDelete } from "../components/AlertDelete";
import {
  Grid,
  Heading,
  Text,
  Tag,
  Image,
  Button,
  GridItem,
} from "@chakra-ui/react";

// LOAD DATA FROM JSON FILE & GET THE RIGHT DATE FROM THE SELECTED EVENT
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

// FORMAT EVENT TIME TO STRING
const formatDateTime = (timeString) => {
  const date = new Date(timeString);

  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return formatter.format(date);
};

// USE DATA FROM JSON FILE
export const EventPage = () => {
  const { users, event, categories } = useLoaderData();

  // USE STATE FOR EDIT MODAL & DELETE DIALOG
  const [editOpen, setEditOpen] = useState(false);
  const openEdit = () => {
    setEditOpen(true);
  };
  const editClose = () => {
    setEditOpen(false);
  };

  const [deleteOpen, setDeleteOpen] = useState(false);
  const openDelete = () => {
    setDeleteOpen(true);
  };
  const deleteClose = () => {
    setDeleteOpen(false);
  };

  // NAVIGATION
  const navigate = useNavigate();

  // DELETE EVENT
  const deleteEvent = () => {
    fetch(`http://localhost:3000/events/${event.id}`, {
      method: "DELETE",
    }).then(() => {
      navigate("/");
    });
  };

  // SHOW EVENT DETAILS
  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <GridItem colSpan={2}>
          <Image
            boxSize="100%"
            h="350px"
            objectFit="cover"
            src={event.image}
            alt={event.title}
          />
        </GridItem>
        <div>
          <Heading>{event.title}</Heading>

          <Text mb="2">{event.description}</Text>
          <Text as="b">{event.location}</Text>
          <Text>Start time: {formatDateTime(event.startTime)}</Text>
          <Text>End time: {formatDateTime(event.endTime)}</Text>

          {categories
            .filter((category) => event.categoryIds.includes(category.id))
            .map((category) => (
              <Tag key={category.id}>{category.name}</Tag>
            ))}

          {users
            .filter((user) => event.categoryIds.includes(user.id))
            .map((user) => (
              <div key={user.id}>
                <Text mt="4" display="block">
                  Created by:
                </Text>
                <div>
                  <Image
                    borderRadius="full"
                    boxSize="100px"
                    src={user.image}
                    alt={user.name}
                  />
                  {user.name}
                </div>
              </div>
            ))}
        </div>
        <div>
          <Button
            mb="4"
            style={{ display: "block", width: "100%" }}
            onClick={() => openEdit(event)}
          >
            Edit event
          </Button>
          <Button
            style={{ display: "block", width: "100%" }}
            colorScheme="red"
            onClick={() => openDelete()}
          >
            Delete event
          </Button>
        </div>

        {/* EDIT MODAL */}
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

        {/* DELETE DIALOG */}
        {deleteOpen && (
          <>
            <AlertDelete
              isOpen={deleteOpen}
              onClose={deleteClose}
              event={event}
              deleteEvent={deleteEvent}
            />
          </>
        )}
      </Grid>
    </>
  );
};
