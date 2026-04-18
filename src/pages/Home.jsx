
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import { useState } from "react";

const Home = () => {
  const [selectedCollege, setSelectedCollege] = useState("");

  const filteredEvents = events.filter(
    (e) =>
      selectedCollege === "" || e.college === selectedCollege
  );

  return (
    <>
      <Navbar
        selectedCollege={selectedCollege}
        setSelectedCollege={setSelectedCollege}
      />

      {filteredEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </>
  );
};