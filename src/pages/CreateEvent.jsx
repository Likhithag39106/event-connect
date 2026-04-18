import { useState } from "react";
import Navbar from "../components/Navbar";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState({
    title: "",
    description: "",
    college: "",
    date: "",
    location: "",
    time: "",
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "events"), event);
      navigate(`/event/${docRef.id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (name) => ({
    ...styles.input,
    borderColor: focused === name ? "#a78bfa" : "#e5e7eb",
    boxShadow: focused === name ? "0 0 0 3px rgba(167,139,250,0.15)" : "none",
    background: focused === name ? "#ffffff" : "#f9fafb",
  });

  const fp = (name) => ({
    onFocus: () => setFocused(name),
    onBlur:  () => setFocused(""),
  });

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>

        {/* Back link */}
        <button style={styles.backLink} onClick={() => navigate("/home")}>
          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All events
        </button>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconWrapper}>
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 style={styles.title}>Create an event</h2>
          <p style={styles.subtitle}>Fill in the details below to publish your event</p>
        </div>

        {/* Form card */}
        <form onSubmit={handleSubmit} style={styles.card}>

          {/* Section — Basic info */}
          <p style={styles.sectionLabel}>Basic info</p>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Event title <span style={styles.required}>*</span></label>
            <input
              name="title"
              placeholder="e.g. Annual Tech Fest 2025"
              onChange={handleChange}
              style={inputStyle("title")}
              {...fp("title")}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Description <span style={styles.required}>*</span></label>
            <textarea
              name="description"
              placeholder="What is this event about? Share details, agenda, or highlights…"
              onChange={handleChange}
              rows={4}
              style={{
                ...inputStyle("description"),
                resize: "vertical",
                lineHeight: "1.6",
                fontFamily: "inherit",
              }}
              {...fp("description")}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>College / Organisation <span style={styles.required}>*</span></label>
            <input
              name="college"
              placeholder="e.g. IIT Hyderabad"
              onChange={handleChange}
              style={inputStyle("college")}
              {...fp("college")}
              required
            />
          </div>

          <div style={styles.divider} />

          {/* Section — Date & location */}
          <p style={styles.sectionLabel}>Date &amp; location</p>

          <div style={styles.row}>
            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>Date <span style={styles.required}>*</span></label>
              <input
                type="date"
                name="date"
                onChange={handleChange}
                style={inputStyle("date")}
                {...fp("date")}
                required
              />
            </div>

            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>Time</label>
              <input
                type="time"
                name="time"
                onChange={handleChange}
                style={inputStyle("time")}
                {...fp("time")}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Location</label>
            <input
              name="location"
              placeholder="e.g. Main Auditorium, Block A"
              onChange={handleChange}
              style={inputStyle("location")}
              {...fp("location")}
            />
          </div>

          <div style={styles.divider} />

          {/* Actions */}
          <div style={styles.actions}>
            <button
              type="button"
              style={styles.cancelBtn}
              onClick={() => navigate("/home")}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                ...styles.submitBtn,
                opacity: loading ? 0.75 : 1,
                transform: loading ? "scale(0.99)" : "scale(1)",
              }}
              disabled={loading}
            >
              {loading ? (
                <span style={styles.btnContent}>
                  <span style={styles.spinner} /> Publishing…
                </span>
              ) : (
                <span style={styles.btnContent}>
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M5 13l4 4L19 7" />
                  </svg>
                  Publish event
                </span>
              )}
            </button>
          </div>
        </form>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f3ff",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "32px 20px 56px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    fontWeight: "500",
    color: "#7c3aed",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    alignSelf: "flex-start",
  },
  header: {
    textAlign: "center",
  },
  iconWrapper: {
    width: "52px",
    height: "52px",
    background: "#ffffff",
    border: "1px solid #ede9fe",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 14px",
    color: "#7c3aed",
  },
  title: {
    margin: "0 0 6px",
    fontSize: "22px",
    fontWeight: "600",
    color: "#1c1917",
    letterSpacing: "-0.3px",
  },
  subtitle: {
    margin: 0,
    fontSize: "14px",
    color: "#78716c",
  },
  card: {
    background: "#ffffff",
    borderRadius: "20px",
    border: "1px solid #ede9fe",
    padding: "28px 32px",
    boxShadow: "0 2px 12px rgba(139,92,246,0.07)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  sectionLabel: {
    margin: 0,
    fontSize: "11px",
    fontWeight: "600",
    color: "#a8a29e",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#44403c",
  },
  required: {
    color: "#a78bfa",
  },
  input: {
    padding: "11px 14px",
    fontSize: "14px",
    border: "1.5px solid #e5e7eb",
    borderRadius: "10px",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s, background 0.15s",
    color: "#1c1917",
    width: "100%",
    boxSizing: "border-box",
  },
  row: {
    display: "flex",
    gap: "12px",
  },
  divider: {
    height: "1px",
    background: "#f5f3ff",
    margin: "4px 0",
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "4px",
  },
  cancelBtn: {
    flex: 1,
    padding: "12px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#44403c",
    background: "#ffffff",
    border: "1.5px solid #e5e7eb",
    borderRadius: "10px",
    cursor: "pointer",
  },
  submitBtn: {
    flex: 2,
    padding: "12px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "opacity 0.15s, transform 0.15s",
  },
  btnContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
  },
  spinner: {
    width: "14px",
    height: "14px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#ffffff",
    borderRadius: "50%",
    display: "inline-block",
    animation: "spin 0.7s linear infinite",
  },
};

export default CreateEvent;