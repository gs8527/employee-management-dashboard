import { useState } from "react";
import Employee from "./components/Employee";
import Login from "./Login";

function App() {
const [loggedIn, setLoggedIn] = useState(false);
const [darkMode, setDarkMode] = useState(false);
const gradientStyle = `
@keyframes dashboardBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`;
if (!loggedIn) {
return <Login onLogin={() => setLoggedIn(true)} />;
}

return (
  <>
    <style>{gradientStyle}</style>

    <div
 style={{
  background: darkMode
    ? "#111827"
    : "linear-gradient(-45deg, #dbecfe, #93c5fd, #60a5fa, #3bf6ed)",
  backgroundSize: "400% 400%",
  animation: darkMode
    ? "none"
    : "dashboardBG 15s ease infinite",
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
color: "#4d25eb",
fontSize: "40px",
margin: 0,
}}
>
Smart Employee Management Dashboard </h1>

      <p
  style={{
    color: darkMode ? "#d9d1db" : "#796b80",
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
    {darkMode ? "💡 Light" : "🌙 Dark"}
  </button>

  <button
    onClick={() => setLoggedIn(false)}
    style={{
      background: "#f00d0d",
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
  fontSize: "20px",
  fontWeight: "700",
  color: darkMode ? "white" : "#1f2937",
}}
  >
    Welcome, Gayathri 👋🏻
  </h2>

  <Employee darkMode={darkMode} />
</>
</div>
  </>
);
}

export default App;
