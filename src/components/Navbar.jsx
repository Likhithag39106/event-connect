import { useNavigate } from "react-router-dom";

const Navbar = ({ selectedCollege, setSelectedCollege }) => {
  const navigate = useNavigate();

  const handleCollegeChange = (e) => {
    setSelectedCollege(e.target.value);
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo} onClick={() => navigate("/home")}>
        EventConnect
      </h2>

      <div style={styles.links}>
        <button onClick={() => navigate("/home")}>Home</button>

        {/* College Dropdown */}
        <select value={selectedCollege} onChange={handleCollegeChange}>
          <option value="">All Colleges</option>
          <option value="ABC College">ABC College</option>
          <option value="XYZ College">XYZ College</option>
          <option value="DEF College">DEF College</option>
        </select>

        <button onClick={() => navigate("/create")}>
          Register Event
        </button>

        <button onClick={() => navigate("/profile")}>
          Profile
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#282c34",
    color: "white",
    alignItems: "center",
  },
  logo: {
    cursor: "pointer",
  },
  links: {
    display: "flex",
    gap: "10px",
  },
};

export default Navbar;