import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Card.css";
import Logo from "../assets/Driving_School.png";
import Row from "../components/Row";

const Card: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // `id` might be undefined
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [eMail, setEMail] = useState("");
  const [progressRecords, setProgressRecords] = useState([
    { variable: "Cockpit Drill & Controls", stage: "Introduced" },
    { variable: "Moving Off Safely", stage: "Introduced" },
    { variable: "Steer Accurate Course", stage: "Introduced" },
    { variable: "Stop Normally", stage: "Introduced" },
    { variable: "Gear Changing", stage: "Introduced" },
    { variable: "Clutch Control (level & uphill)", stage: "Introduced" },
    { variable: "Approaching & Turning Left", stage: "Introduced" },
    { variable: "Approaching & Emerging Left", stage: "Introduced" },
    { variable: "Approaching & Turning Right", stage: "Introduced" },
    { variable: "Approaching & Emerging Left", stage: "Introduced" },
    { variable: "Crossing Path", stage: "Introduced" },
    { variable: "Moving off at an angle", stage: "Introduced" },
    { variable: "Hill Starts (up & down)", stage: "Introduced" },
    { variable: "Controlled Stop", stage: "Introduced" },
    { variable: "Cross Roads", stage: "Introduced" },
    { variable: "Ancillary Controls", stage: "Introduced" },
  ]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch existing pupil data when id is present
      const fetchPupilData = async () => {
        try {
          const response = await fetch(
            `http://localhost:4000/api/pupils/${id}`
          );
          const pupil = await response.json();
          if (response.ok) {
            setFirstName(pupil.firstName);
            setLastName(pupil.lastName);
            setEMail(pupil.eMail);
            setProgressRecords(pupil.progressRecords);
          } else {
            setError(pupil.error || "An error occurred");
          }
        } catch (error) {
          setError("Failed to fetch pupil data.");
        }
      };

      fetchPupilData();
    }
  }, [id]);

  const formatProgressReport = () => {
    return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background: #fff;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #4CAF50;
              margin-bottom: 10px;
            }
            h2 {
              color: #333;
              margin-bottom: 20px;
              border-bottom: 2px solid #4CAF50;
              padding-bottom: 10px;
            }
            ul {
              list-style: none;
              padding: 0;
            }
            li {
              margin-bottom: 10px;
              padding: 10px;
              border-bottom: 1px solid #ddd;
            }
            .variable {
              font-weight: bold;
              color: #555;
            }
            .stage {
              color: #777;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${firstName} ${lastName}'s Progress Report</h1>
            <h2>Progress Record</h2>
            <ul>
              ${progressRecords
                .map(
                  (record) => `
                <li>
                  <span class="variable">${record.variable}</span>: <span class="stage">${record.stage}</span>
                </li>
              `
                )
                .join("")}
            </ul>
          </div>
        </body>
      </html>
    `;
  };

  const handleSendReport = async () => {
    const reportHtml = formatProgressReport();

    try {
      const response = await fetch(
        "http://localhost:4000/api/pupils/send-report",
        {
          method: "POST",
          body: JSON.stringify({
            to: eMail,
            subject: "Your Progress Report",
            html: reportHtml,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        alert("Report sent successfully");
      } else {
        const errorData = await response.json();
        alert(`Failed to send report: ${errorData.error}`);
      }
    } catch (error) {
      alert("An error occurred while sending the report.");
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const pupil = { firstName, lastName, eMail, progressRecords };

    try {
      const response = id
        ? await fetch(`http://localhost:4000/api/pupils/${id}`, {
            method: "PATCH",
            body: JSON.stringify(pupil),
            headers: { "Content-Type": "application/json" },
          })
        : await fetch("http://localhost:4000/api/pupils", {
            method: "POST",
            body: JSON.stringify(pupil),
            headers: { "Content-Type": "application/json" },
          });

      if (!response.ok) {
        const json = await response.json();
        setError(json.error);
      } else {
        navigate("/");
      }
    } catch (error) {
      setError("An error occurred while saving the pupil.");
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      const response = await fetch(`http://localhost:4000/api/pupils/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate("/"); // Redirect after successful deletion
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
      <img src={Logo} className="logo" alt="Driving School Logo" />
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
            <Row
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
