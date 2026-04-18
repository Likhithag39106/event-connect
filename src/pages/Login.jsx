import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/home");
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/home");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconWrapper}>
            <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
            </svg>
          </div>
          <h2 style={styles.title}>Welcome back</h2>
          <p style={styles.subtitle}>Sign in to your account</p>
        </div>

        {/* Card */}
        <div style={styles.card}>

          {/* Error banner */}
          {error && (
            <div style={styles.errorBanner}>
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                onChange={handleChange}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                style={{
                  ...styles.input,
                  borderColor: error ? "#fca5a5" : focused === "email" ? "#a78bfa" : "#e5e7eb",
                  boxShadow: focused === "email" ? "0 0 0 3px rgba(167,139,250,0.15)" : "none",
                  background: focused === "email" ? "#ffffff" : "#f9fafb",
                }}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.labelRow}>
                <label style={styles.label}>Password</label>
                <span style={styles.forgotLink}>Forgot password?</span>
              </div>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused("")}
                style={{
                  ...styles.input,
                  borderColor: error ? "#fca5a5" : focused === "password" ? "#a78bfa" : "#e5e7eb",
                  boxShadow: focused === "password" ? "0 0 0 3px rgba(167,139,250,0.15)" : "none",
                  background: focused === "password" ? "#ffffff" : "#f9fafb",
                }}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                ...styles.button,
                opacity: loading ? 0.75 : 1,
                transform: loading ? "scale(0.99)" : "scale(1)",
              }}
              disabled={loading}
            >
              {loading ? (
                <span style={styles.buttonContent}>
                  <span style={styles.spinner} /> Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>or</span>
            <div style={styles.dividerLine} />
          </div>

          {/* Google */}
          <button style={styles.googleButton} type="button">
            <svg width="17" height="17" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Footer */}
        <p style={styles.footer}>
          Don't have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f3ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  container: {
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
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
  },
  icon: {
    width: "22px",
    height: "22px",
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
    boxShadow: "0 4px 24px rgba(139,92,246,0.08)",
  },
  errorBanner: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#fff1f2",
    border: "1px solid #fecdd3",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "13px",
    color: "#dc2626",
    marginBottom: "16px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  labelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#44403c",
  },
  forgotLink: {
    fontSize: "12px",
    color: "#7c3aed",
    cursor: "pointer",
    fontWeight: "500",
  },
  input: {
    padding: "11px 14px",
    fontSize: "14px",
    border: "1.5px solid #e5e7eb",
    borderRadius: "10px",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s, background 0.15s",
    color: "#1c1917",
  },
  button: {
    marginTop: "4px",
    padding: "13px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "opacity 0.15s, transform 0.15s",
    letterSpacing: "0.01em",
  },
  buttonContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
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
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "20px 0",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#f0edf8",
  },
  dividerText: {
    fontSize: "12px",
    color: "#a8a29e",
    fontWeight: "500",
  },
  googleButton: {
    width: "100%",
    padding: "11px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#44403c",
    background: "#ffffff",
    border: "1.5px solid #e5e7eb",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "background 0.15s, border-color 0.15s",
  },
  footer: {
    textAlign: "center",
    fontSize: "13px",
    color: "#78716c",
    margin: 0,
  },
  link: {
    color: "#7c3aed",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "underline",
    textDecorationColor: "rgba(124,58,237,0.3)",
    textUnderlineOffset: "2px",
  },
};

export default Login;