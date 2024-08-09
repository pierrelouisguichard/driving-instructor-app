// components/PupilDetailsForm.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { ToggleButton } from "./SkillsSection";

interface Props {
  firstName: string;
  lastName: string;
  eMail: string;
  onChangeFirstName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeLastName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPupilDetails: boolean;
  togglePupilDetails: () => void;
}

const PupilDetailsForm: React.FC<Props> = ({
  firstName,
  lastName,
  eMail,
  onChangeFirstName,
  onChangeLastName,
  onChangeEmail,
  showPupilDetails,
  togglePupilDetails,
}) => (
  <>
    <ToggleButton type="button" onClick={togglePupilDetails}>
      <FontAwesomeIcon
        icon={showPupilDetails ? faAngleDown : faAngleRight}
        size="lg"
      />{" "}
      Pupil Details
    </ToggleButton>
    {showPupilDetails && (
      <PupilDetailsContainer>
        <FieldWrapper>
          <Label>First Name:</Label>
          <Input type="text" onChange={onChangeFirstName} value={firstName} />
        </FieldWrapper>
        <FieldWrapper>
          <Label>Last Name:</Label>
          <Input type="text" onChange={onChangeLastName} value={lastName} />
        </FieldWrapper>
        <FieldWrapper>
          <Label>Email:</Label>
          <Input type="email" onChange={onChangeEmail} value={eMail} />
        </FieldWrapper>
      </PupilDetailsContainer>
    )}
  </>
);

export default PupilDetailsForm;

const PupilDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 0;
  width: 100%;
  margin: auto;

  @media (min-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
  }
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;
