import { useState } from "react";
import Employee from "./components/Employee";
import Login from "./Login";

function App() {
const [loggedIn, setLoggedIn] = useState(false);
const [darkMode, setDarkMode] = useState(false);

if (!loggedIn) {
return <Login onLogin={() => setLoggedIn(true)} />;
}

return (
<div
  style={{
    background: darkMode ? "#111827" : "#f4f6f9",
    color: darkMode ? "white" : "black",
    minHeight: "100vh",
    padding: "30px",
    transition: "0.3s",
  }}
>
<div
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
marginBottom: "30px",
}}
> <div>
<h1
style={{
color: "#2563eb",
fontSize: "40px",
margin: 0,
}}
>
Smart Employee Management Dashboard </h1>

      <p
  style={{
    color: darkMode ? "#d1d5db" : "#6b7280",
  }}
>
        Built with React, FastAPI & SQLite
      </p>
    </div>

    <div style={{ display: "flex", gap: "10px" }}>
  <button
    onClick={() => setDarkMode(!darkMode)}
    style={{
      background: "#111827",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    {darkMode ? "☀️ Light" : "🌙 Dark"}
  </button>

  <button
    onClick={() => setLoggedIn(false)}
    style={{
      background: "#ef4444",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    Logout
  </button>
</div>
  </div>

  <>
  <h2
    style={{
     color: darkMode ? "white" : "#374151",
      marginBottom: "20px",
    }}
  >
    Welcome, Gayathri 👋
  </h2>

  <Employee darkMode={darkMode} />
</>
</div>

);
}

export default App;
