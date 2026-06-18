import { useState } from "react";

function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const gradientStyle = `
    @keyframes gradientBG {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  `;

  return (
    <>
      <style>{gradientStyle}</style>

      <div
  style={{
    backgroundImage: "url('/future-visions-business-technology-concept.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
        <div
  style={{
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "40px",
    borderRadius: "20px",
    width: "380px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
    textAlign: "center",
  }}
>
          <h1
            style={{
              fontSize: "27px",
              fontWeight: "bold",
              color: "black",
              marginBottom: "20px",
            }}
          >
            Smart Employee Portal
          </h1>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
style={{
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  background: "rgba(255,255,255,0.85)",
  color: "black",
  outline: "none",
}}
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <div
  style={{
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
    gap: "8px",
  }}
>
  <input
    type="checkbox"
    checked={showPassword}
    onChange={() => setShowPassword(!showPassword)}
  />

  <label
    style={{
      color: "black",
      fontSize: "14px",
      cursor: "pointer",
    }}
  >
    Show Password
  </label>
</div>

          {error && (
            <p
              style={{
                color: "red",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          <button
            onClick={() => {
              if (
                username === "Gayathri S" &&
                password === "Gayathri@2005"
              ) {
                setError("");
                onLogin();
              } else {
                setError("❌ Invalid Username or Password");
              }
            }}
            style={{
              width: "100%",
              padding: "12px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;