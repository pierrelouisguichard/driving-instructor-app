// components/SkillsSection.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import StageSelectionComponent from "./StageSelectionComponent";
import styled from "styled-components";

interface Skill {
  variable: string;
  stage: string;
}

interface Props {
  title: string;
  skillsList: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  visible: boolean;
  onToggle: () => void;
}

const SkillsSection: React.FC<Props> = ({
  title,
  skillsList,
  setSkills,
  visible,
  onToggle,
}) => (
  <>
    <ToggleButton type="button" onClick={onToggle}>
      <FontAwesomeIcon icon={visible ? faAngleDown : faAngleRight} size="lg" />{" "}
      {title}
    </ToggleButton>
    {visible &&
      skillsList.map((record, index) => (
        <StageSelectionComponent
          key={index}
          variable={record.variable}
          stage={record.stage}
          onStageChange={(stage: string) => {
            const newSkills = [...skillsList];
            newSkills[index].stage = stage;
            setSkills(newSkills);
          }}
        />
      ))}
  </>
);

export default SkillsSection;

export const ToggleButton = styled.button`
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 20px;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  font-size: 18px;
  text-align: left;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.primary};
  }
`;
