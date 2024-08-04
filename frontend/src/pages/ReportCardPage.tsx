import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import StageSelectionComponent from "../components/StageSelectionComponent";
import formatProgressReport from "../utils/formatProgressReport";
import {
  deletePupil,
  fetchSinglePupil,
  savePupil,
  sendProgressReport,
} from "../services/apiServices";
import {
  defaultAdvancedSkillsList,
  defaultIntermediateSkillsList,
  defaultNoviceSkillsList,
} from "../models/drivingSkillsList";

/*
 * This is the Report Card page (/card). It is used to:
 * - Create a new pupil if no ID is present in the URL.
 * - Edit and update the details of an existing pupil if an ID is included in the URL.
 * - Fill out and send the progress record.
 */
const ReportCardPage: React.FC = () => {
  const [showPupilDetails, setShowPupilDetails] = useState(true);
  const { id } = useParams<{ id: string }>(); // Extract the id from the url.
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [eMail, setEMail] = useState("");
  const [noviceSkillsList, setNoviceSkills] = useState(defaultNoviceSkillsList);
  const [intermediateSkillsList, setIntermediateSkills] = useState(
    defaultIntermediateSkillsList
  );
  const [advancedSkillsList, setAdvancedSkills] = useState(
    defaultAdvancedSkillsList
  );
  const [error, setError] = useState("");

  // This method fetches pupil details and populates the fields if an ID is present in the URL.
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const pupil = await fetchSinglePupil(id);
          setFirstName(pupil.firstName);
          setLastName(pupil.lastName);
          setEMail(pupil.eMail);
          setNoviceSkills(pupil.noviceSkillsList);
          setIntermediateSkills(pupil.intermediateSkillsList);
          setAdvancedSkills(pupil.advancedSkillsList);
        } catch (error) {
          setError((error as Error).message);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleSendReport = async () => {
    const reportHtml = formatProgressReport({
      firstName,
      lastName,
      eMail,
      noviceSkillsList,
      intermediateSkillsList,
      advancedSkillsList,
    });

    try {
      await sendProgressReport({
        to: eMail,
        subject: "Your Progress Report",
        html: reportHtml,
      });
      alert("Report sent successfully");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pupil = {
      firstName,
      lastName,
      eMail,
      noviceSkillsList,
      intermediateSkillsList,
      advancedSkillsList,
    };

    try {
      await savePupil(id, pupil);
      navigate("/");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleDelete = async () => {
    if (id) {
      try {
        const result = await deletePupil(id);
        if (result.success) {
          navigate("/");
        }
      } catch (error) {
        setError((error as Error).message);
      }
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleSkillChange =
    (
      skillsList: any[],
      setSkills: React.Dispatch<React.SetStateAction<any[]>>
    ) =>
    (index: number, stage: string) => {
      const newSkills = [...skillsList];
      newSkills[index].stage = stage;
      setSkills(newSkills);
    };

  // This method iterates through skills in a category (novice, intermediate, advanced)
  // and creates a DrivingSkill component for each, allowing progress stage selection for each skill.
  const renderSkillsSection = (
    title: string,
    skillsList: any[],
    setSkills: React.Dispatch<React.SetStateAction<any[]>>
  ) => (
    <div>
      <h2>{title}</h2>
      {skillsList.map((record, index) => (
        <StageSelectionComponent
          key={index}
          variable={record.variable}
          stage={record.stage}
          onStageChange={(stage: string) =>
            handleSkillChange(skillsList, setSkills)(index, stage)
          }
        />
      ))}
    </div>
  );

  const togglePupilDetails = () => {
    setShowPupilDetails((prevState) => !prevState);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {id && (
          <Button type="button" onClick={handleDelete}>
            Delete
          </Button>
        )}
        <h3>
          {id
            ? `${firstName} ${lastName}'s Progress Record`
            : "Add a New Pupil"}
        </h3>

        <ToggleButton type="button" onClick={togglePupilDetails}>
          {showPupilDetails ? "Hide Pupil Details" : "Show Pupil Details"}
        </ToggleButton>

        {showPupilDetails && (
          <>
            <h1>Pupil Details</h1>
            <label>First Name:</label>
            <Input
              type="text"
              onChange={handleInputChange(setFirstName)}
              value={firstName}
            />

            <label>Last Name:</label>
            <Input
              type="text"
              onChange={handleInputChange(setLastName)}
              value={lastName}
            />

            <label>Email:</label>
            <Input
              type="email"
              onChange={handleInputChange(setEMail)}
              value={eMail}
            />
          </>
        )}

        <SkillsContainer>
          <h1>Skills List</h1>
          {renderSkillsSection(
            "Novice Skills",
            noviceSkillsList,
            setNoviceSkills
          )}
          {renderSkillsSection(
            "Intermediate Skills",
            intermediateSkillsList,
            setIntermediateSkills
          )}
          {renderSkillsSection(
            "Advanced Skills",
            advancedSkillsList,
            setAdvancedSkills
          )}
        </SkillsContainer>

        <Button type="submit">{id ? "Save Changes" : "Add Pupil"}</Button>
        {id && (
          <Button type="button" onClick={handleSendReport}>
            Send Report
          </Button>
        )}
        {error && <Error>{error}</Error>}
      </Form>
    </Container>
  );
};

export default ReportCardPage;

// Styles
const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px;
  margin: 5px 0;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ToggleButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

const Error = styled.div`
  color: red;
  margin-top: 10px;
`;

const SkillsContainer = styled.div`
  margin-top: 20px;
`;
