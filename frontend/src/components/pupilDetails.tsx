import React from "react";
import "./pupilDetails.css";
import PupilInterface from "../interface/pupilInterface";

interface Props {
  pupil: PupilInterface;
  onDelete: (id: string) => void;
  pupilKey: string; // Function to handle delete action
}

const PupilDetails: React.FC<Props> = ({ pupil, pupilKey, onDelete }) => {
  return (
    <div className="pupil-card">
      <h4>{pupil.firstName + " " + pupil.lastName}</h4>
      {/* <p>{pupil.eMail}</p> */}
      {/* <p>{pupil.createdAt}</p> */}
      <button className="delete-button" onClick={() => onDelete(pupilKey)}>
        Delete Pupil
      </button>
    </div>
  );
};

export default PupilDetails;
