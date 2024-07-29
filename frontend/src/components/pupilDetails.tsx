import React from "react";
import PupilInterface from "../interface/PupilInterface";

const PupilDetails: React.FC<PupilInterface> = ({ firstName, lastName }) => {
  return (
    <div className="pupil-card">
      <h4>{firstName + " " + lastName}</h4>
    </div>
  );
};

export default PupilDetails;
