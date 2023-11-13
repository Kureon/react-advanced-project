import React from "react";
import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

import { NewEvent } from "../components/NewEvent";

// Load page and data
export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  // console.log("Events:", events);
  // console.log("Categories:", categories);

  return {
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const EventsPage = () => {
  // Use data
  const { events, categories } = useLoaderData();
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventData, setEventData] = useState(events);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Create new event
  const createEvent = async (event) => {
    // Add error handling
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(event),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });
    event.id = (await response.json()).id;
    setEvents(events.concat(event));
    closeModal();
  };

  return (
    <>
      <Heading>List of events</Heading>
      <button onClick={openModal}>New event</button>

      <NewEvent isModalOpen={isModalOpen} closeModal={closeModal} />

      {events.map((event) => (
        <Link key={event.id} to={`/event/${event.id}`}>
          <img src={event.image} alt={event.title} />

          {categories
            .filter((category) => event.categoryIds.includes(category.id))
            .map((category) => (
              <span key={category.id}>{category.name}</span>
            ))}

          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <b>{event.location}</b>
          {/* Change the start time display */}
          <p>Start time: {event.startTime}</p>
          <p>End time: {event.endTime}</p>
        </Link>
      ))}
    </>
  );
};
