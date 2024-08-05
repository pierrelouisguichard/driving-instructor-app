import styled from "styled-components";
import { DrivingSkillWithMethod } from "../interface/Interfaces";
import { stages } from "../constants/skillsConstants";
import { FaChevronDown } from "react-icons/fa";

// This component allows users to select the progression stage of a skill.
function StageSelectionComponent(props: DrivingSkillWithMethod) {
  const { variable, stage, onStageChange } = props;

  const handleStageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStageChange(event.target.value);
  };

  return (
    <Container>
      <Variable>{variable}</Variable>
      <SelectWrapper>
        <Select value={stage} onChange={handleStageChange}>
          {stages.map((stageOption, index) => (
            <option key={index} value={stageOption}>
              {stageOption}
            </option>
          ))}
        </Select>
        <Icon>
          <FaChevronDown />
        </Icon>
      </SelectWrapper>
    </Container>
  );
}

export default StageSelectionComponent;

// Function to map each stage to a color
const getStageColor = (stage: string) => {
  switch (stage) {
    case "Introduced":
      return "#7391e2";
    case "Talk Through":
      return "#e48902";
    case "Prompted":
      return "#d8a303";
    case "Rarely Prompted":
      return "#8bc34a";
    case "Independent":
      return "#18921c";
    default:
      return "#007bff";
  }
};

// Styles
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Roboto", sans-serif;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Variable = styled.p`
  font-weight: bold;
  margin: 0;
  color: #333;
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
  margin-right: 50px;
  @media (max-width: 600px) {
    margin-bottom: 10px;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  width: fit-content;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

// Style the select element and apply dynamic background color
const Select = styled.select<{ value: string }>`
  appearance: none;
  background-color: ${(props) => getStageColor(props.value)};
  color: ${(props) =>
    props.value === "Introduced" || props.value === "Talk Through"
      ? "#333"
      : "white"};
  border: none;
  padding: 10px 40px 10px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  transition: background-color 0.3s ease;
  font-family: "Open Sans", sans-serif;

  &:hover {
    background-color: ${(props) => getStageColor(props.value)};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  option {
    background-color: white;
    color: black;
  }
`;

const Icon = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  color: white;
`;
