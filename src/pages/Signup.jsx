import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      // ✅ Create user in Firebase Auth
      const userCred = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCred.user;

      // ✅ Store user in Firestore (users collection)
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date().toISOString()
      });

      // ✅ IMPORTANT: Logout immediately
      await signOut(auth);

      alert("Signup successful! Please login.");

      // ✅ Redirect to login page
      navigate("/login");

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("User already exists. Please login.");
        navigate("/login");
      } else {
        console.error(error);
        alert(error.message);
      }
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSignup} style={styles.card}>
        <h2 style={styles.heading}>Create Account</h2>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Signup
        </button>

        <p style={styles.text}>
          Already have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f8ff" // pastel blue
  },
  card: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  heading: {
    textAlign: "center",
    color: "#6a5acd"
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none"
  },
  button: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#b19cd9", // pastel purple
    color: "white",
    cursor: "pointer"
  },
  text: {
    textAlign: "center",
    fontSize: "14px"
  },
  link: {
    color: "#6a5acd",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default Signup;