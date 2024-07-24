import React from "react";
import "./pupilDetails.css";
import PupilInterface from "../interface/pupilInterface";

interface Props {
  pupil: PupilInterface;
}

const PupilDetails: React.FC<Props> = ({ pupil }) => {
  return (
    <div className="pupil-card">
      <h4>{pupil.firstName + " " + pupil.lastName}</h4>
    </div>
  );
};

export default PupilDetails;
