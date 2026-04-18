import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.nav}>
      <h2 style={styles.logo} onClick={() => navigate("/home")}>
        EventConnect
      </h2>

      <div style={styles.links}>
        {/* ✅ ADD THIS */}
        <button onClick={() => navigate("/home")}>Home</button>

        <button onClick={() => navigate("/create")}>Create</button>
        <button onClick={() => navigate("/profile")}>Profile</button>

        <button
          onClick={() => {
            signOut(auth);
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    background: "#e6e6fa"
  },
  logo: { cursor: "pointer" },
  links: { display: "flex", gap: "10px" }
};

export default Navbar;