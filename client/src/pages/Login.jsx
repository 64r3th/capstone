import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Invalid login attempt");
      }

      localStorage.setItem("token", data.accessToken);

      const userResponse = await fetch("http://localhost:3001/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const userData = await userResponse.json();
      if (!userResponse.ok || !userData.role) {
        throw new Error("Failed to retrieve user details.");
      }

      setUser(userData);
      navigate(userData.role === "admin" ? "/admin" : "/students");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={user_name}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>No account found!</p>
      <button onClick={() => navigate("/register")}>Register</button>
    </div>
  );
};

export default Login;
