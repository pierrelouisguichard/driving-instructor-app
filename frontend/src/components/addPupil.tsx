import { useState } from "react";
import "./addPupil.css";

interface AddPupilProps {
  onAddPupil: () => void; // Callback function to be called after adding a pupil
}

function AddPupil({ onAddPupil }: AddPupilProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [eMail, setEMail] = useState("");
  const [error, setError] = useState("");

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
      console.log("New pupil added");
      onAddPupil(); // Notify the parent component to refresh the list
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
        <button type="submit">Add Pupil</button>
      </form>

      {error && <div className="error">{error}</div>}
    </>
  );
}

export default AddPupil;
