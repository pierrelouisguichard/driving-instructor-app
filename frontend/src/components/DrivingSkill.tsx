import React from "react";
import { DrivingSkillInterface } from "../interface/Interfaces";
import { stages } from "../constants/skillsConstants";

interface DrivingSkillDropDown extends DrivingSkillInterface {
  onStageChange: (stage: string) => void;
}

function DrivingSkill(props: DrivingSkillDropDown) {
  const { variable, stage, onStageChange } = props;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStageChange(event.target.value);
  };

  return (
    <div>
      <div>
        <p>{variable}</p>
      </div>
      <div>
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
