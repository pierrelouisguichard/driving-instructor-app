import { Key, useEffect, useState } from "react";
import PupilDetails from "../components/pupilDetails";
import "./Pupil.css";
import PupilInterface from "../interface/pupilInterface";
import { useNavigate } from "react-router-dom";

function Pupil() {
  const [pupils, setPupils] = useState<PupilInterface[] | null>(null);
  const navigate = useNavigate();

  const handleNavigate = (pupilId: string) => {
    navigate(`/card/${pupilId}`);
  };

  const fetchPupils = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/pupils");

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

  useEffect(() => {
    fetchPupils();
  }, []);

  const handleNew = () => {
    navigate("/card");
  };

  return (
    <div>
      <h2>Pupil List</h2>
      <button onClick={handleNew}>New</button>
      <div className="pupils">
        {pupils &&
          pupils.map((pupil) => (
            <div key={pupil._id}>
              <button
                onClick={() => handleNavigate(pupil._id)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  textAlign: "left",
                  width: "100%",
                }}
              >
                <PupilDetails pupil={pupil} />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Pupil;
