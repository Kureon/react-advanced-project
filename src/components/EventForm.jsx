import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import {
  Input,
  Textarea,
  Button,
  Checkbox,
  Flex,
  Spacer,
} from "@chakra-ui/react";

export const EventForm = () => {
  const { users, categories } = useLoaderData();
  const navigate = useNavigate();

  const [createdBy, setCreatedBy] = useState(1);
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

  const startTime = inputStartDate + "T" + inputStartTime;
  const endTime = inputEndDate + "T" + inputEndTime;

  console.log(categoryIds);

  const handleCheckboxChange = (event) => {
    const categoryId = parseInt(event.target.value, 10);

    if (event.target.checked) {
      setCategoryIds((pre) => [...pre, categoryId]);
    } else {
      setCategoryIds((pre) => {
        return [...pre.filter((item) => item !== categoryId)];
      });
    }
  };

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

    setIsPending(true);

    fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    }).then(() => {
      console.log("New event added");
      setIsPending(false);
      navigate("/");
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
            <Checkbox
              type="checkbox"
              name={category.name}
              id={`category-${category.id}`}
              onChange={handleCheckboxChange}
              value={category.id}
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
      <Flex>
        <Spacer />
        <Link to={"/"}>
          <Button mt="2">Cancel</Button>
        </Link>
        {!isPending && (
          <Button mt="2" ml="2" type="submit">
            Save event
          </Button>
        )}
        {isPending && (
          <Button mt="2" ml="2" disabled>
            Adding event..
          </Button>
        )}
      </Flex>
    </form>
  );
};
