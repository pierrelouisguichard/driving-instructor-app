import { useState } from "react";
import "./Row.css";

function Row(props: { variable: any }) {
  const [progress, setProgress] = useState(0);

  const stages = [
    "Introduced",
    "Talk Through",
    "Prompted",
    "Rarely Prompted",
    "Independent",
  ];

  const { variable } = props;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProgress(parseInt(event.target.value));
  };

  return (
    <div className="row-container">
      <div className="variable">
        <p>{variable}</p>
      </div>
      <div className="progress-dropdown">
        <select value={progress} onChange={handleChange}>
          {stages.map((stage, index) => (
            <option key={index} value={index}>
              {stage}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Row;
