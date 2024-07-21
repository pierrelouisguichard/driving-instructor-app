import { useState } from "react";

function addPupil() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [eMail, setEMail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    console.log("button pressed");
    e.preventDefault();

    const pupil = { firstName, lastName, eMail };

    const response = await fetch("http://localhost:4000/api/pupils", {
      method: "POST",
      body: JSON.stringify(pupil),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setFirstName("");
      setLastName("");
      setEMail("");
      //   setError(null);
      console.log("new pupil add", json);
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
        ></input>

        <label>Last Name:</label>
        <input
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        ></input>

        <label>EMail:</label>
        <input
          type="text"
          onChange={(e) => setEMail(e.target.value)}
          value={eMail}
        ></input>
        <button>Add Pupil</button>
      </form>

      {error && <div className="error">{error}</div>}
    </>
  );
}

export default addPupil;
