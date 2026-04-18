const EventCard = ({ event }) => {

  const handleCopyLink = () => {
    const url = `${window.location.origin}/event/${event.id}`;
    navigator.clipboard.writeText(url);
    alert("Event link copied!");
  };

  return (
    <div style={styles.card}>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p><strong>College:</strong> {event.college}</p>
      <p><strong>Date:</strong> {event.date || "N/A"}</p>

      <button onClick={handleCopyLink}>
        Copy Event Link
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "10px",
    margin: "10px 0",
    backgroundColor: "#f9f9f9",
  },
};

export default EventCard;