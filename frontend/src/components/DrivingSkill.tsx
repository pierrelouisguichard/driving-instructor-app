import { DrivingSkillInterface } from "../interface/DrivingSkillInterface";

interface DrivingSkillDropDown extends DrivingSkillInterface {
  onStageChange: (stage: string) => void; // Make it required for this component
}

function DrivingSkill(props: DrivingSkillDropDown) {
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

export default DrivingSkill;
