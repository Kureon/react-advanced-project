import { React, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import {
  Heading,
  Input,
  SimpleGrid,
  Card,
  CardBody,
  AspectRatio,
  Image,
  Text,
  Tag,
  Button,
  Flex,
  Spacer,
} from "@chakra-ui/react";

// Load page and data
export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    events: await events.json(),
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

export const EventsPage = () => {
  const [search, setSearch] = useState("");

  // Use data
  const { events, categories } = useLoaderData();

  return (
    <>
      <Flex mt="4" mb="4">
        <Heading>List of events</Heading>
        <Spacer />
        <Button>
          <Link to={"/new-event"}>New event</Link>
        </Button>
      </Flex>

      <Input
        mb="2"
        placeholder="Search events"
        size="md"
        onChange={(event) => setSearch(event.target.value)}
      />

      <SimpleGrid minChildWidth="250px" gap={6}>
        {events
          .filter((event) => {
            const nameMatch = event.title
              .toLowerCase()
              .includes(search.toLowerCase());

            const categoryMatch = Array.isArray(event.categoryIds)
              ? event.categoryIds
                  .map(
                    (categoryId) =>
                      categories.find((category) => category.id === categoryId)
                        ?.name
                  )
                  .some((categoryName) =>
                    categoryName.toLowerCase().includes(search.toLowerCase())
                  )
              : false;

            return nameMatch || categoryMatch;
          })
          .map((event) => (
            <Link key={event.id} to={`/event/${event.id}`}>
              <Card mt="2" mb="2" h="450px">
                <CardBody>
                  <AspectRatio ratio={16 / 9}>
                    <Image src={event.image} alt={event.title} />
                  </AspectRatio>

                  <Heading noOfLines={2}>{event.title}</Heading>
                  <Text mb="2">{event.description}</Text>
                  <Text as="b">{event.location}</Text>
                  <Text>Start time: {formatDateTime(event.startTime)}</Text>
                  <Text>End time: {formatDateTime(event.endTime)}</Text>

                  {categories
                    .filter((category) =>
                      event.categoryIds.includes(category.id)
                    )
                    .map((category) => (
                      <Tag mt={3} mb={3} mr={1} key={category.id}>
                        {category.name}
                      </Tag>
                    ))}
                </CardBody>
              </Card>
            </Link>
          ))}
      </SimpleGrid>
    </>
  );
};
