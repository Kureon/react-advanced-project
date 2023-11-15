import { React, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { Heading, Input } from "@chakra-ui/react";

// Load page and data
export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const EventsPage = () => {
  const [search, setSearch] = useState("");

  // Use data
  const { events, categories } = useLoaderData();

  // Format event time
  const formatDateTime = (timeString) => {
    const date = new Date(timeString);

    const formatter = new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    });

    return formatter.format(date);
  };

  return (
    <>
      <Heading>List of events</Heading>

      <Input
        placeholder="Search events"
        size="md"
        onChange={(event) => setSearch(event.target.value)}
      />

      <Link to={"/new-event"}>New event</Link>

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
          <p>Start time: {formatDateTime(event.startTime)}</p>
          <p>End time: {formatDateTime(event.endTime)}</p>
        </Link>
      ))}
    </>
  );
};
