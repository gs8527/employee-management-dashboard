import { useState } from "react";

function Login({ onLogin }) {
const [showPassword, setShowPassword] = useState(false);
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

return (
<div
style={{
height: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
backgroundImage:
"url('https://images.unsplash.com/photo-1497366754035-f200968a6e72')",
backgroundSize: "cover",
backgroundPosition: "center",
}}
>
<div
style={{
background: "rgba(255,255,255,0.9)",
padding: "30px",
borderRadius: "15px",
width: "350px",
}}
>
<h2
style={{
textAlign: "center",
color: "#2563eb",
marginBottom: "20px",
}}
>
Smart Employee Portal </h2>

    <input
  type="text"
  placeholder="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
      }}
    />

    <input
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
      }}
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      style={{
        marginBottom: "15px",
        background: "none",
        border: "none",
        color: "#2563eb",
        cursor: "pointer",
      }}
    >
      {showPassword ? "👁 Hide Password" : "👁 Show Password"}
    </button>
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
      username === "gayathri" &&
      password === "gayathri123"
    ) {
      setError("");
      onLogin();
    } else {
      setError("❌ Invalid Username or Password");
    }
  }}
      style={{
        width: "100%",
        padding: "10px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "5px",
      }}
    >
      Login
    </button>
  </div>
</div>


);
}

export default Login;
