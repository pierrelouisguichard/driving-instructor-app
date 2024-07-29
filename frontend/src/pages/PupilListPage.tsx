// Pupil.tsx
import { useEffect, useState } from "react";
import PupilDetails from "../components/PupilDetails";
import PupilInterface from "../interface/PupilInterface";
import { useNavigate } from "react-router-dom";

// Constants for the API endpoint
const PUPILS_API_URL = "http://localhost:4000/api/pupils";

// Custom hook for fetching pupils
const useFetchPupils = () => {
  const [pupils, setPupils] = useState<PupilInterface[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPupils = async () => {
      try {
        const response = await fetch(PUPILS_API_URL);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setPupils(data);
      } catch (error) {
        console.error("Error fetching pupils:", error);
        setError("Failed to fetch pupils. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPupils();
  }, []);

  return { pupils, loading, error };
};

function Pupil() {
  const { pupils, loading, error } = useFetchPupils();
  const navigate = useNavigate();

  const handleNavigate = (pupilId: string) => {
    navigate(`/card/${pupilId}`);
  };

  const handleNew = () => {
    navigate("/card");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Pupil List</h2>
      <button onClick={handleNew} className="button-new">
        New
      </button>
      <div className="pupils">
        {pupils &&
          pupils.map((pupil) => (
            <div key={pupil._id}>
              <button
                onClick={() => handleNavigate(pupil._id)}
                className="pupil-button"
              >
                <PupilDetails
                  firstName={pupil.firstName}
                  lastName={pupil.lastName}
                  _id={""}
                  eMail={""}
                  createdAt={""}
                  drivingSkillsList={[]}
                />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Pupil;
