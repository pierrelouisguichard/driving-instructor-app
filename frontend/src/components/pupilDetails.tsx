import React from "react";
import "./pupilDetails.css";

interface Pupil {
  firstName: string;
  lastName: string;
  eMail: string;
  createdAt: string; // Assuming createdAt is a string; adjust type if it's a different type
}

interface Props {
  pupil: Pupil;
  onDelete: (id: string) => void;
  pupilKey: string; // Function to handle delete action
}

const PupilDetails: React.FC<Props> = ({ pupil, pupilKey, onDelete }) => {
  return (
    <div className="pupil-details">
      <h4>{pupil.firstName}</h4>
      <h5>{pupil.lastName}</h5>
      <p>{pupil.eMail}</p>
      <p>{pupil.createdAt}</p>
      <button className="delete-button" onClick={() => onDelete(pupilKey)}>
        Delete Pupil
      </button>
    </div>
  );
};

export default PupilDetails;
