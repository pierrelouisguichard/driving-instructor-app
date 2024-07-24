import "./Row.css";

interface RowProps {
  variable: string;
  stage: string;
  onStageChange: (stage: string) => void;
}

function Row(props: RowProps) {
  const stages = [
    "Introduced",
    "Talk Through",
    "Prompted",
    "Rarely Prompted",
    "Independent",
  ];

  const { variable, stage, onStageChange } = props;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStageChange(event.target.value);
  };

  return (
    <div className="row-container">
      <div className="variable">
        <p>{variable}</p>
      </div>
      <div className="progress-dropdown">
        <select value={stage} onChange={handleChange}>
          {stages.map((stageOption, index) => (
            <option key={index} value={stageOption}>
              {stageOption}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Row;
