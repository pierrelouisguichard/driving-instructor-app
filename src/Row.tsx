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

  return (
    <div className="row-container">
      <div className="variable">
        <p>{variable}</p>
      </div>
      <div className="progress-bar">
        {stages.map((stage, index) => (
          <div
            key={index}
            className={`progress-stage ${progress >= index ? "completed" : ""} ${progress === index ? "current" : ""}`}
            onClick={() => setProgress(index)}
          >
            {stage}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
