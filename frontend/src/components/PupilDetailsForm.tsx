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
  notes: string;
  drivingLicenseChecked: boolean;
  eyeSightChecked: boolean;
  glassesContactsWorn: boolean;
  theoryTestBooked: boolean;
  theoryTestPassed: boolean;
  practicalTestBooked: boolean;
  showPupilDetails: boolean;
  onChangeFirstName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeLastName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeNotes: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeOne: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTwo: () => void;
  onChangeThree: () => void;
  onChangeFour: () => void;
  onChangeFive: () => void;
  onChangeSix: () => void;
  togglePupilDetails: () => void;
}

const PupilDetailsForm: React.FC<Props> = ({
  firstName,
  lastName,
  eMail,
  notes,
  drivingLicenseChecked,
  eyeSightChecked,
  glassesContactsWorn,
  theoryTestBooked,
  theoryTestPassed,
  practicalTestBooked,
  showPupilDetails,
  onChangeOne,
  onChangeTwo,
  onChangeThree,
  onChangeFour,
  onChangeFive,
  onChangeSix,
  onChangeFirstName,
  onChangeLastName,
  onChangeEmail,
  togglePupilDetails,
  onChangeNotes,
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
        <Top>
          {" "}
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
        </Top>

        <Bottom>
          {/* New Checkboxes */}
          <CheckboxWrapper>
            <Label>
              <Checkbox
                name="drivingLicenseChecked"
                onChange={onChangeOne}
                checked={drivingLicenseChecked}
              />
              Driving License Checked
            </Label>
            <Label>
              <Checkbox
                name="eyeSightChecked"
                onChange={onChangeTwo}
                checked={eyeSightChecked}
              />
              Eye Sight Checked
            </Label>
            <Label>
              <Checkbox
                name="glassesContactsWorn"
                onChange={onChangeThree}
                checked={glassesContactsWorn}
              />
              Glasses/Contacts Worn
            </Label>
            <Label>
              <Checkbox
                name="theoryTestBooked"
                onChange={onChangeFour}
                checked={theoryTestBooked}
              />
              Theory Test Booked
            </Label>
            <Label>
              <Checkbox
                name="theoryTestPassed"
                onChange={onChangeFive}
                checked={theoryTestPassed}
              />
              Theory Test Passed
            </Label>
            <Label>
              <Checkbox
                name="practicalTestBooked"
                onChange={onChangeSix}
                checked={practicalTestBooked}
              />
              Practical Test Booked
            </Label>
          </CheckboxWrapper>

          {/* Notes Text Area */}
          <FieldWrapper>
            <Label>Notes:</Label>
            <NotesTextArea
              name="notes"
              onChange={onChangeNotes}
              value={notes}
            />
          </FieldWrapper>
        </Bottom>
      </PupilDetailsContainer>
    )}
  </>
);

export default PupilDetailsForm;

const Top = styled.div`
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

const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;
  padding: 10px 0;
  width: 100%;
  margin: auto;

  @media (max-width: 600px) {
    flex-direction: column;
    flex-wrap: wrap;
    gap: 16px;
  }
`;

const PupilDetailsContainer = styled.div``;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 12px; /* Add space between checkbox and text */
  font-size: 16px;
  color: #333;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  accent-color: ${(props) =>
    props.theme.colors.primary}; /* Change checkbox color */
  cursor: pointer;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NotesTextArea = styled.textarea`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  resize: vertical;
`;
