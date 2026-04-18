import { auth } from "../firebase";
import Navbar from "../components/Navbar";

const Profile = () => {
  const user = auth.currentUser;

  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : "??";

  const joinDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric",
      })
    : "Unknown";

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>

        {/* Avatar + Name */}
        <div style={styles.avatarSection}>
          <div style={styles.avatar}>{initials}</div>
          <h2 style={styles.name}>{user?.displayName || "User"}</h2>
          <span style={styles.badge}>Free plan</span>
        </div>

        {/* Info Card */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>Account details</p>

          <div style={styles.row}>
            <div style={styles.rowLeft}>
              <svg style={styles.rowIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span style={styles.rowLabel}>Email</span>
            </div>
            <span style={styles.rowValue}>{user?.email || "—"}</span>
          </div>

          <div style={styles.divider} />

          <div style={styles.row}>
            <div style={styles.rowLeft}>
              <svg style={styles.rowIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
              </svg>
              <span style={styles.rowLabel}>User ID</span>
            </div>
            <span style={styles.rowValueMono}>{user?.uid || "—"}</span>
          </div>

          <div style={styles.divider} />

          <div style={styles.row}>
            <div style={styles.rowLeft}>
              <svg style={styles.rowIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span style={styles.rowLabel}>Joined</span>
            </div>
            <span style={styles.rowValue}>{joinDate}</span>
          </div>

          <div style={styles.divider} />

          <div style={styles.row}>
            <div style={styles.rowLeft}>
              <svg style={styles.rowIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span style={styles.rowLabel}>Email verified</span>
            </div>
            <span style={{
              ...styles.verifiedBadge,
              background: user?.emailVerified ? "#f0fdf4" : "#fff7ed",
              color: user?.emailVerified ? "#15803d" : "#c2410c",
              border: `1px solid ${user?.emailVerified ? "#bbf7d0" : "#fed7aa"}`,
            }}>
              {user?.emailVerified ? "Verified" : "Not verified"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          <button style={styles.btnSecondary}>Edit profile</button>
          <button style={styles.btnDanger}>Sign out</button>
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
    maxWidth: "480px",
    margin: "0 auto",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  avatarSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  avatar: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: "1px",
    boxShadow: "0 4px 16px rgba(124,58,237,0.25)",
  },
  name: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "600",
    color: "#1c1917",
    letterSpacing: "-0.2px",
  },
  badge: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#7c3aed",
    background: "#ede9fe",
    border: "1px solid #ddd6fe",
    borderRadius: "20px",
    padding: "3px 10px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #ede9fe",
    padding: "20px 24px",
    boxShadow: "0 2px 12px rgba(139,92,246,0.06)",
  },
  cardTitle: {
    margin: "0 0 16px",
    fontSize: "11px",
    fontWeight: "600",
    color: "#a8a29e",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 0",
    gap: "12px",
  },
  rowLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minWidth: 0,
  },
  rowIcon: {
    width: "16px",
    height: "16px",
    color: "#a78bfa",
    flexShrink: 0,
  },
  rowLabel: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#78716c",
    whiteSpace: "nowrap",
  },
  rowValue: {
    fontSize: "13px",
    color: "#1c1917",
    fontWeight: "500",
    textAlign: "right",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "220px",
  },
  rowValueMono: {
    fontSize: "11px",
    color: "#6d28d9",
    fontFamily: "monospace",
    background: "#f5f3ff",
    padding: "3px 8px",
    borderRadius: "6px",
    border: "1px solid #ede9fe",
    maxWidth: "160px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  divider: {
    height: "1px",
    background: "#f5f3ff",
  },
  verifiedBadge: {
    fontSize: "12px",
    fontWeight: "600",
    padding: "3px 10px",
    borderRadius: "20px",
    whiteSpace: "nowrap",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  btnSecondary: {
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
  btnDanger: {
    flex: 1,
    padding: "12px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#dc2626",
    background: "#fff1f2",
    border: "1.5px solid #fecdd3",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default Profile;