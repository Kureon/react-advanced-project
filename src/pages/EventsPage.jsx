import React from "react";
// import { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  console.log("Events:", events);
  console.log("Categories:", categories);

  return {
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();

  return (
    <>
      <Heading>List of events</Heading>
      <button type="button">Add event</button>

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
          <p>Start time: {event.startTime}</p>
          <p>End time: {event.endTime}</p>
        </Link>
      ))}
    </>
  );
};
