import { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // try {
    //   await axios.post("http://localhost:5173/", {
    //     username,
    //     password,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
