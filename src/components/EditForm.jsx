import { useState, useEffect } from "react";
import { Input, Textarea, Button } from "@chakra-ui/react";

export const EditForm = ({
  onClose,
  selectedEvent,
  users,
  event,
  categories,
}) => {
  const [createdBy, setCreatedBy] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [location, setLocation] = useState("");
  const [inputStartDate, setInputStartDate] = useState("");
  const [inputStartTime, setInputStartTime] = useState("");
  const [inputEndDate, setInputEndDate] = useState("");
  const [inputEndTime, setInputEndTime] = useState("");

  const [isPending, setIsPending] = useState(false);

  const handleCheckboxChange = (categoryId) => {
    if (categoryIds.includes(categoryId)) {
      setCategoryIds((prevIds) => prevIds.filter((id) => id !== categoryId));
    } else {
      setCategoryIds((prevIds) => [...prevIds, categoryId]);
    }
  };

  let [dateStart, timeStart] = event.startTime.split("T");
  if (timeStart.length > 5) {
    timeStart = timeStart.slice(0, 5);
  }

  let [dateEnd, timeEnd] = event.endTime.split("T");
  if (timeEnd.length > 5) {
    timeEnd = timeEnd.slice(0, 5);
  }

  useEffect(() => {
    // Update state when event prop changes
    setCreatedBy(event.createdBy || "");
    setTitle(event.title || "");
    setDescription(event.description || "");
    setImage(event.image || "");
    setCategoryIds(event.categoryIds || []);
    setLocation(event.location || "");
    setInputStartDate(dateStart || "");
    setInputStartTime(timeStart || "");
    setInputEndDate(dateEnd || "");
    setInputEndTime(timeEnd || "");
  }, [event]);

  const startTime = inputStartDate + "T" + inputStartTime;
  const endTime = inputEndDate + "T" + inputEndTime;

  const handleSubmit = (event) => {
    event.preventDefault();
    const eventData = {
      createdBy,
      title,
      description,
      image,
      categoryIds,
      location,
      startTime,
      endTime,
    };

    setIsPending("true");

    fetch(`http://localhost:3000/events/$`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    }).then(() => {
      console.log("Updated event added");
      setIsPending(false);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="author">Author</label>
        <select
          name="author"
          id=""
          onChange={(event) => setCreatedBy(event.target.value)}
          value={createdBy}
          required
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
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
        <label htmlFor="image">Image url</label>
        <Input
          type="text"
          name="image"
          id=""
          onChange={(event) => setImage(event.target.value)}
          value={image}
          required
        />
      </div>
      <div>
        <label htmlFor="categories">Categories</label>
        {categories.map((category) => (
          <div key={category.id}>
            <input
              type="checkbox"
              name={category.name}
              id=""
              onChange={() => handleCheckboxChange(category.id)}
              value={category.id}
              checked={categoryIds.includes(category.id)}
            />
            <label htmlFor={category.name}>{category.name}</label>
          </div>
        ))}
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
          onChange={(event) => setInputStartDate(event.target.value)}
          value={inputStartDate}
          required
        />
      </div>
      <div>
        <label htmlFor="start-time">Start time</label>
        <Input
          type="time"
          name="start-time"
          id=""
          onChange={(event) => setInputStartTime(event.target.value)}
          value={inputStartTime}
          required
        />
      </div>
      <div>
        <label htmlFor="end-date">End date</label>
        <Input
          type="date"
          name="end-date"
          id=""
          onChange={(event) => setInputEndDate(event.target.value)}
          value={inputEndDate}
          required
        />
      </div>
      <div>
        <label htmlFor="end-time">End time</label>
        <Input
          type="time"
          name="end-time"
          id=""
          onChange={(event) => setInputEndTime(event.target.value)}
          value={inputEndTime}
          required
        />
      </div>
      {!isPending && <Button type="submit">Save event</Button>}
      {isPending && <Button disabled>Adding event..</Button>}
      <Button onClick={onClose}>Cancel</Button>
    </form>
  );
};
