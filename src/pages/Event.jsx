import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Event = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const events = JSON.parse(localStorage.getItem("events")) || [];
  const event = events.find(e => e.id.toString() === id);

  // ── Not found ──────────────────────────────────────────
  if (!event) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.notFound}>
          <div style={styles.notFoundIcon}>
            <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 style={styles.notFoundTitle}>Event not found</h3>
          <p style={styles.notFoundSub}>This event may have been removed or the link is incorrect.</p>
          <button style={styles.backBtn} onClick={() => navigate("/home")}>← Back to events</button>
        </div>
      </div>
    );
  }

  // ── Event detail ───────────────────────────────────────
  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>

        {/* Back button */}
        <button style={styles.backLink} onClick={() => navigate("/home")}>
          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All events
        </button>

        {/* Hero card */}
        <div style={styles.heroCard}>
          <div style={styles.accentBar} />
          <div style={styles.heroBody}>

            {/* College tag */}
            {event.college && (
              <span style={styles.collegeTag}>
                <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                {event.college}
              </span>
            )}

            <h1 style={styles.eventTitle}>{event.title}</h1>

            {/* Meta row */}
            <div style={styles.metaRow}>
              {event.date && (
                <div style={styles.metaChip}>
                  <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {event.date}
                </div>
              )}
              {event.location && (
                <div style={styles.metaChip}>
                  <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </div>
              )}
              {event.category && (
                <div style={styles.categoryChip}>{event.category}</div>
              )}
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div style={styles.grid}>

          {/* Description */}
          {event.description && (
            <div style={styles.card}>
              <p style={styles.cardLabel}>About this event</p>
              <p style={styles.description}>{event.description}</p>
            </div>
          )}

          {/* Details sidebar */}
          <div style={styles.sidebar}>

            {/* Info card */}
            <div style={styles.card}>
              <p style={styles.cardLabel}>Event details</p>

              <div style={styles.detailRow}>
                <div style={styles.detailLeft}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span style={styles.detailKey}>Date</span>
                </div>
                <span style={styles.detailVal}>{event.date || "—"}</span>
              </div>

              <div style={styles.detailDivider} />

              <div style={styles.detailRow}>
                <div style={styles.detailLeft}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  <span style={styles.detailKey}>College</span>
                </div>
                <span style={styles.detailVal}>{event.college || "—"}</span>
              </div>

              {event.location && (
                <>
                  <div style={styles.detailDivider} />
                  <div style={styles.detailRow}>
                    <div style={styles.detailLeft}>
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span style={styles.detailKey}>Location</span>
                    </div>
                    <span style={styles.detailVal}>{event.location}</span>
                  </div>
                </>
              )}

              {event.time && (
                <>
                  <div style={styles.detailDivider} />
                  <div style={styles.detailRow}>
                    <div style={styles.detailLeft}>
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span style={styles.detailKey}>Time</span>
                    </div>
                    <span style={styles.detailVal}>{event.time}</span>
                  </div>
                </>
              )}
            </div>

            {/* Register button */}
            <button style={styles.registerBtn}>
              Register for this event
            </button>

            <button style={styles.shareBtn}>
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f3ff",
  },
  container: {
    maxWidth: "860px",
    margin: "0 auto",
    padding: "32px 20px 48px",
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
  heroCard: {
    background: "#ffffff",
    borderRadius: "20px",
    border: "1px solid #ede9fe",
    boxShadow: "0 2px 12px rgba(139,92,246,0.07)",
    overflow: "hidden",
  },
  accentBar: {
    height: "5px",
    background: "linear-gradient(90deg, #7c3aed, #a78bfa, #c084fc)",
  },
  heroBody: {
    padding: "28px 32px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  collegeTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "11px",
    fontWeight: "600",
    color: "#7c3aed",
    background: "#f5f3ff",
    border: "1px solid #ede9fe",
    borderRadius: "20px",
    padding: "3px 10px",
    alignSelf: "flex-start",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
  },
  eventTitle: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "700",
    color: "#1c1917",
    letterSpacing: "-0.4px",
    lineHeight: "1.3",
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  metaChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "12px",
    fontWeight: "500",
    color: "#78716c",
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "20px",
    padding: "4px 10px",
  },
  categoryChip: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#6d28d9",
    background: "#ede9fe",
    border: "1px solid #ddd6fe",
    borderRadius: "20px",
    padding: "4px 10px",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 280px",
    gap: "20px",
    alignItems: "start",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #ede9fe",
    padding: "20px 24px",
    boxShadow: "0 2px 12px rgba(139,92,246,0.05)",
  },
  cardLabel: {
    margin: "0 0 14px",
    fontSize: "11px",
    fontWeight: "600",
    color: "#a8a29e",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
  description: {
    margin: 0,
    fontSize: "14px",
    color: "#44403c",
    lineHeight: "1.8",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  detailRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "9px 0",
    gap: "12px",
  },
  detailLeft: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#a78bfa",
  },
  detailKey: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#78716c",
    whiteSpace: "nowrap",
  },
  detailVal: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#1c1917",
    textAlign: "right",
  },
  detailDivider: {
    height: "1px",
    background: "#f5f3ff",
  },
  registerBtn: {
    width: "100%",
    padding: "13px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    letterSpacing: "0.01em",
  },
  shareBtn: {
    width: "100%",
    padding: "11px",
    fontSize: "13px",
    fontWeight: "500",
    color: "#44403c",
    background: "#ffffff",
    border: "1.5px solid #e5e7eb",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  notFound: {
    textAlign: "center",
    padding: "60px 20px",
    maxWidth: "400px",
    margin: "40px auto",
    background: "#ffffff",
    borderRadius: "20px",
    border: "1px solid #ede9fe",
  },
  notFoundIcon: {
    width: "56px",
    height: "56px",
    background: "#f5f3ff",
    border: "1px solid #ede9fe",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 14px",
    color: "#a78bfa",
  },
  notFoundTitle: {
    margin: "0 0 6px",
    fontSize: "18px",
    fontWeight: "600",
    color: "#1c1917",
  },
  notFoundSub: {
    margin: "0 0 20px",
    fontSize: "13px",
    color: "#78716c",
  },
  backBtn: {
    padding: "11px 20px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#7c3aed",
    background: "#f5f3ff",
    border: "1px solid #ddd6fe",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default Event;