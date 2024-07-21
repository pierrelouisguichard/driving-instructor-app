import { Key, useEffect, useState } from "react";
import PupilDetails from "../components/pupilDetails";
import AddPupil from "../components/addPupil";
import "./Pupil.css";

// Define the interface for a pupil
interface Pupil {
  _id: Key; // Assuming Key is imported and represents the type of _id
  firstName: string;
  lastName: string;
  eMail: string;
  createdAt: string; // Assuming createdAt is a string; adjust type if needed
}

function Pupil() {
  // Initialize state with the correct type
  const [pupils, setPupils] = useState<Pupil[] | null>(null);

  useEffect(() => {
    const fetchPupils = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/pupils"); // This will be proxied to http://localhost:4000/api/pupils

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const json = await response.json();
        setPupils(json);
      } catch (error) {
        console.error("Error fetching pupils:", error);
        // Optionally handle the error state here
      }
    };

    fetchPupils();
  }, []);

  return (
    <div>
      <h2>Pupil List</h2>
      <div className="pupils">
        {pupils &&
          pupils.map((pupil) => (
            <div key={pupil._id} className="pupil-card">
              <PupilDetails pupil={pupil} />
            </div>
          ))}
      </div>
      <AddPupil />
    </div>
  );
}

export default Pupil;
