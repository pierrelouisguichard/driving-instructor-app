import React from "react";
import styled from "styled-components";
import { DrivingSkillWithMethod } from "../interface/Interfaces";
import { stages } from "../constants/skillsConstants";
import { FaChevronDown } from "react-icons/fa";

// Define the component props interface
interface StageSelectionProps extends DrivingSkillWithMethod {}

const StageSelectionComponent: React.FC<StageSelectionProps> = (props) => {
  const { variable, stage, onStageChange } = props;

  const handleStageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStageChange(event.target.value);
  };

  return (
    <Container>
      <Variable>{variable}</Variable>
      <ContentWrapper>
        {/* Show progress bar on larger screens and dropdown on smaller screens */}
        <ProgressWrapper>
          <ProgressBar value={stages.indexOf(stage) + 1} max={stages.length} />
        </ProgressWrapper>
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
      </ContentWrapper>
    </Container>
  );
};

export default StageSelectionComponent;

// Function to map each stage to a color
const getStageColor = (stage: string): string => {
  switch (stage) {
    case "Introduced":
      return "#5d5d5d"; // Dark Blue
    case "Talk Through":
      return "#213260"; // Dark Blue
    case "Prompted":
      return "#5571bf"; // Medium Blue
    case "Rarely Prompted":
      return "#79b2f3"; // Light Blue
    case "Independent":
      return "#97e7ff"; // Very Light Blue
    default:
      return "#D3D3D3"; // Light Gray (Default color)
  }
};

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #f9f9f9;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Roboto", sans-serif;
`;

const Variable = styled.p`
  font-weight: bold;
  margin: 0;
  color: "#213260";
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
  margin-bottom: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const ProgressWrapper = styled.div`
  display: none;
  @media (min-width: 601px) {
    display: block;
    width: 100%;
    margin-right: 15px;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  width: fit-content;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

// Progress Bar
const ProgressBar = styled.progress`
  width: 100%;
  height: 8px;
  border-radius: 5px;
  appearance: none;
  &::-webkit-progress-bar {
    background-color: #e0e0e0;
    border-radius: 5px;
  }
  &::-webkit-progress-value {
    background-color: ${(props: any) => getStageColor(stages[props.value - 1])};
    border-radius: 5px;
  }
  &::-moz-progress-bar {
    background-color: ${(props: any) => getStageColor(stages[props.value - 1])};
    border-radius: 5px;
  }
`;

// Style the select element and apply dynamic background color
const Select = styled.select<{ value: string }>`
  appearance: none;
  background-color: ${(props) => getStageColor(props.value)};
  color: white;
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
