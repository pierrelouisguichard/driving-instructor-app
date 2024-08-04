import styled from "styled-components";
import { DrivingSkillWithMethod } from "../interface/Interfaces";
import { stages } from "../constants/skillsConstants";

// This component allows users to select the progression stage of a skill.
function StageSelectionComponent(props: DrivingSkillWithMethod) {
  const { variable, stage, onStageChange } = props;

  const handleStageChange = (selectedStage: string) => {
    onStageChange(selectedStage);
  };

  return (
    <Container>
      <Variable>{variable}</Variable>
      <ButtonContainer>
        {stages.map((stageOption, index) => (
          <StageButton
            type="button"
            key={index}
            active={stage === stageOption}
            onClick={() => handleStageChange(stageOption)}
          >
            {stageOption}
          </StageButton>
        ))}
      </ButtonContainer>
    </Container>
  );
}

export default StageSelectionComponent;

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Variable = styled.p`
  font-weight: bold;
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const StageButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? "blue" : "gray")};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ active }) => (active ? "#003d99" : "#4d4d4d")};
  }
`;
