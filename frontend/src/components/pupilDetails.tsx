import React from "react";

interface Pupil {
  firstName: string;
  lastName: string;
  eMail: string;
  createdAt: string; // Assuming createdAt is a string; adjust type if it's a different type
}

interface Props {
  pupil: Pupil;
}

const PupilDetails: React.FC<Props> = ({ pupil }) => {
  return (
    <div className="pupil-details">
      <h4>{pupil.firstName}</h4>
      <h5>{pupil.lastName}</h5>
      <p>{pupil.eMail}</p>
      <p>{pupil.createdAt}</p>
    </div>
  );
};

export default PupilDetails;
