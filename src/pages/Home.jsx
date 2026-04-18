import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "events"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>

        {/* Page Header */}
        <div style={styles.pageHeader}>
          <div>
            <h2 style={styles.pageTitle}>All Events</h2>
            <p style={styles.pageSubtitle}>
              {loading ? "Loading…" : `${events.length} event${events.length !== 1 ? "s" : ""} available`}
            </p>
          </div>
          <div style={styles.headerBadge}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Upcoming
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div style={styles.grid}>
            {[1, 2, 3].map(i => (
              <div key={i} style={styles.skeleton}>
                <div style={styles.skeletonLine} />
                <div style={{ ...styles.skeletonLine, width: "60%", marginTop: "10px" }} />
                <div style={{ ...styles.skeletonLine, width: "40%", marginTop: "8px" }} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && events.length === 0 && (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>
              <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p style={styles.emptyTitle}>No events yet</p>
            <p style={styles.emptySubtitle}>Check back soon for upcoming events.</p>
          </div>
        )}

        {/* Events Grid */}
        {!loading && events.length > 0 && (
          <div style={styles.grid}>
            {events.map((e, idx) => (
              <div key={e.id} style={styles.card}>

                {/* Card accent bar */}
                <div style={{
                  ...styles.accentBar,
                  background: accentColors[idx % accentColors.length],
                }} />

                <div style={styles.cardBody}>
                  {/* College tag */}
                  {e.college && (
                    <span style={styles.collegeTag}>
                      <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                      {e.college}
                    </span>
                  )}

                  {/* Title */}
                  <h3 style={styles.cardTitle}>{e.title}</h3>

                  {/* Description */}
                  {e.description && (
                    <p style={styles.cardDesc}>{e.description}</p>
                  )}

                  {/* Footer row */}
                  <div style={styles.cardFooter}>
                    {e.date && (
                      <span style={styles.metaChip}>
                        <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {e.date}
                      </span>
                    )}
                    {e.location && (
                      <span style={styles.metaChip}>
                        <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {e.location}
                      </span>
                    )}
                    <button style={styles.viewBtn}>View details →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

const accentColors = [
  "linear-gradient(90deg, #7c3aed, #a78bfa)",
  "linear-gradient(90deg, #6d28d9, #818cf8)",
  "linear-gradient(90deg, #9333ea, #c084fc)",
  "linear-gradient(90deg, #4f46e5, #818cf8)",
];

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f3ff",
  },
  container: {
    maxWidth: "860px",
    margin: "0 auto",
    padding: "36px 20px",
  },
  pageHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "28px",
  },
  pageTitle: {
    margin: "0 0 4px",
    fontSize: "22px",
    fontWeight: "600",
    color: "#1c1917",
    letterSpacing: "-0.3px",
  },
  pageSubtitle: {
    margin: 0,
    fontSize: "13px",
    color: "#78716c",
  },
  headerBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#7c3aed",
    background: "#ede9fe",
    border: "1px solid #ddd6fe",
    borderRadius: "20px",
    padding: "5px 12px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "16px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #ede9fe",
    boxShadow: "0 2px 12px rgba(139,92,246,0.06)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.15s, box-shadow 0.15s",
  },
  accentBar: {
    height: "4px",
    width: "100%",
  },
  cardBody: {
    padding: "18px 20px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
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
    padding: "3px 9px",
    alignSelf: "flex-start",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
  },
  cardTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "600",
    color: "#1c1917",
    letterSpacing: "-0.2px",
    lineHeight: "1.4",
  },
  cardDesc: {
    margin: 0,
    fontSize: "13px",
    color: "#78716c",
    lineHeight: "1.6",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "4px",
  },
  metaChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "11px",
    color: "#a8a29e",
    fontWeight: "500",
  },
  viewBtn: {
    marginLeft: "auto",
    fontSize: "12px",
    fontWeight: "600",
    color: "#7c3aed",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  skeleton: {
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #ede9fe",
    padding: "20px",
    height: "140px",
  },
  skeletonLine: {
    height: "14px",
    background: "#f0edf8",
    borderRadius: "6px",
    width: "80%",
    animation: "pulse 1.5s ease-in-out infinite",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #ede9fe",
  },
  emptyIcon: {
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
  emptyTitle: {
    margin: "0 0 6px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#1c1917",
  },
  emptySubtitle: {
    margin: 0,
    fontSize: "13px",
    color: "#78716c",
  },
};

export default Home;