import { useState } from "react";
import { Input, Textarea, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const EventForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const startTime = startDate + startTime;

  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const eventData = { title, description, location };

    setIsPending("true");

    fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    }).then(() => {
      console.log("New event added");
      setIsPending(false);
    });

    setTitle("");
    setDescription("");
    setLocation("");
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <Input
          type="text"
          name="title"
          id=""
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Event description</label>
        <Textarea
          name="description"
          id=""
          cols="30"
          rows="3"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
          required
        />
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <Input
          type="text"
          name="location"
          id=""
          onChange={(event) => setLocation(event.target.value)}
          value={location}
          required
        />
      </div>
      <div>
        <label htmlFor="start-date">Start date</label>
        <Input
          type="date"
          name="start-date"
          id=""
          onChange={(event) => setStartDate(event.target.value)}
          value={startDate}
          required
        />
      </div>
      <div>
        <label htmlFor="start-time">Start time</label>
        <Input
          type="time"
          name="start-time"
          id=""
          onChange={(event) => setStartTime(event.target.value)}
          value={startTime}
          required
        />
      </div>
      <div>
        <label htmlFor="end-date">End date</label>
        <Input
          type="date"
          name="end-date"
          id=""
          onChange={(event) => setEndDate(event.target.value)}
          value={endDate}
          required
        />
      </div>
      <div>
        <label htmlFor="end-time">End time</label>
        <Input
          type="time"
          name="end-time"
          id=""
          onChange={(event) => setEndTime(event.target.value)}
          value={endTime}
          required
        />
      </div>
      {!isPending && <Button type="submit">Save event</Button>}
      {isPending && <Button disabled>Adding event..</Button>}
      <Link to={"/"}>
        <Button>Cancel</Button>
      </Link>
    </form>
  );
};
