import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addPupil.css";
import Row from "../components/Row";

function AddPupil() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [eMail, setEMail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); //

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const pupil = { firstName, lastName, eMail };

    const response = await fetch("http://localhost:4000/api/pupils", {
      method: "POST",
      body: JSON.stringify(pupil),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const json = await response.json();
      setError(json.error);
    } else {
      setFirstName("");
      setLastName("");
      setEMail("");
      setError("");
      navigate("/");
    }
  };

  return (
    <>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Pupil</h3>

        <label>First Name:</label>
        <input
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />

        <label>Last Name:</label>
        <input
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />

        <label>Email:</label>
        <input
          type="text"
          onChange={(e) => setEMail(e.target.value)}
          value={eMail}
        />
        <h2>Progress Record</h2>
        <Row variable={"Cockpit Drill & Controls"} />
        <Row variable={"Moving Off Safely"} />
        <Row variable={"Steer Accurate Course"} />
        <Row variable={"Stop Normally"} />
        <Row variable={"Gear Changing"} />
        <Row variable={"Clutch Control (level & uphill)"} />
        <Row variable={"Approaching & Turning Left"} />
        <Row variable={"Approaching & Emerging Left"} />
        <Row variable={"Approaching & Turning Right"} />
        <Row variable={"Approaching & Emerging Left"} />
        <Row variable={"Crossing Path"} />
        <Row variable={"Moving off at an angle"} />
        <Row variable={"Hill Starts (up & down)"} />
        <Row variable={"Controlled Stop"} />
        <Row variable={"Cross Roads"} />
        <Row variable={"Ancillary Controls"} />
        <button type="submit">Add Pupil</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
}

export default AddPupil;
