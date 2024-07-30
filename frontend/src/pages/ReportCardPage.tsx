import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DrivingSkill from "../components/DrivingSkill";
import formatProgressReport from "../utils/formatProgressReport";
import { noviceSkillsList } from "../models/drivingSkillsList";
import {
  fetchSinglePupil,
  savePupil,
  sendProgressReport,
} from "../services/apiServices";

const Card: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [eMail, setEMail] = useState("");
  const [progressRecords, setProgressRecords] = useState(noviceSkillsList);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const pupil = await fetchSinglePupil(id);
          setFirstName(pupil.firstName);
          setLastName(pupil.lastName);
          setEMail(pupil.eMail);
          setProgressRecords(pupil.progressRecords);
        } catch (error) {
          // console.log(error.message);
        }
      };

      fetchData();
    }
  }, [id]);

  const handleSendReport = async () => {
    const reportHtml = formatProgressReport({
      firstName,
      lastName,
      noviceSkillsList,
      _id: "",
      eMail: "",
    });

    try {
      await sendProgressReport({
        to: eMail,
        subject: "Your Progress Report",
        html: reportHtml,
      });
      alert("Report sent successfully");
    } catch (error) {
      // alert(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pupil = { firstName, lastName, eMail, progressRecords };
    if (id) {
      try {
        await savePupil(id, pupil);
        navigate("/");
      } catch (error) {
        setError((error as Error).message);
      }
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      const response = await fetch(`http://localhost:4000/api/pupils/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError("An error occurred while deleting the pupil.");
    }
  };

  return (
    <div id="root">
      <div className="progress-container">
        <form className="create" onSubmit={handleSubmit}>
          {id && (
            <button
              type="button"
              onClick={handleDelete}
              className="delete-button"
            >
              Delete
            </button>
          )}
          <h3>{id ? "Edit Pupil" : "Add a New Pupil"}</h3>
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
            type="email"
            onChange={(e) => setEMail(e.target.value)}
            value={eMail}
          />

          <h2>Progress Record</h2>
          {progressRecords.map((record, index) => (
            <DrivingSkill
              key={index}
              variable={record.variable}
              stage={record.stage}
              onStageChange={(stage: string) => {
                const newProgressRecords = [...progressRecords];
                newProgressRecords[index].stage = stage;
                setProgressRecords(newProgressRecords);
              }}
            />
          ))}

          <button type="submit">{id ? "Save Changes" : "Add Pupil"}</button>
          {id && (
            <button
              type="button"
              onClick={handleSendReport}
              className="send-report-button"
            >
              Send Report
            </button>
          )}
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Card;
