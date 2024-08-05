import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
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

  // State to track visibility of each skills section
  const [visibleSections, setVisibleSections] = useState({
    novice: true,
    intermediate: true,
    advanced: true,
  });

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

  // Function to toggle visibility of each skills section
  const toggleSectionVisibility = (section: keyof typeof visibleSections) => {
    setVisibleSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  // This method iterates through skills in a category (novice, intermediate, advanced)
  // and creates a DrivingSkill component for each, allowing progress stage selection for each skill.
  const renderSkillsSection = (
    title: string,
    skillsList: any[],
    setSkills: React.Dispatch<React.SetStateAction<any[]>>,
    sectionKey: keyof typeof visibleSections // added parameter
  ) => (
    <SkillDiv>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        <ToggleSectionIcon
          type="button"
          onClick={() => toggleSectionVisibility(sectionKey)}>
          <FontAwesomeIcon
            icon={visibleSections[sectionKey] ? faEye : faEyeSlash}
            size="lg"
          />
        </ToggleSectionIcon>
      </SectionHeader>
      {visibleSections[sectionKey] &&
        skillsList.map((record, index) => (
          <StageSelectionComponent
            key={index}
            variable={record.variable}
            stage={record.stage}
            onStageChange={(stage: string) =>
              handleSkillChange(skillsList, setSkills)(index, stage)
            }
          />
        ))}
    </SkillDiv>
  );

  const togglePupilDetails = () => {
    setShowPupilDetails((prevState) => !prevState);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <StudentName>
          {id
            ? `${firstName} ${lastName}'s Progress Record`
            : "Add a New Pupil"}
        </StudentName>

        <ToggleButton type="button" onClick={togglePupilDetails}>
          {showPupilDetails ? "Hide Pupil Details" : "Show Pupil Details"}
        </ToggleButton>

        {showPupilDetails && (
          <>
            <SectionTitle>Pupil Details</SectionTitle>
            <PupilDetailsContainer>
              <InputWrapper>
                <Label>First Name:</Label>
                <Input
                  type="text"
                  onChange={handleInputChange(setFirstName)}
                  value={firstName}
                />
              </InputWrapper>

              <InputWrapper>
                <Label>Last Name:</Label>
                <Input
                  type="text"
                  onChange={handleInputChange(setLastName)}
                  value={lastName}
                />
              </InputWrapper>

              <InputWrapper>
                <Label>Email:</Label>
                <Input
                  type="email"
                  onChange={handleInputChange(setEMail)}
                  value={eMail}
                />
              </InputWrapper>
            </PupilDetailsContainer>
          </>
        )}

        <SkillsContainer>
          {/* <h1>Skills List</h1> */}
          {renderSkillsSection(
            "NOVICE",
            noviceSkillsList,
            setNoviceSkills,
            "novice" // pass section key
          )}
          {renderSkillsSection(
            "INTERMEDIATE",
            intermediateSkillsList,
            setIntermediateSkills,
            "intermediate" // pass section key
          )}
          {renderSkillsSection(
            "ADVANCED",
            advancedSkillsList,
            setAdvancedSkills,
            "advanced" // pass section key
          )}
        </SkillsContainer>

        <ButtonContainer>
          <Button type="submit">{id ? "Save Changes" : "Add Pupil"}</Button>
          {id && (
            <Button type="button" onClick={handleSendReport}>
              Send Report via Email
            </Button>
          )}
          {id && (
            <Button
              style={{ backgroundColor: "#830505" }}
              type="button"
              onClick={handleDelete}>
              Delete Pupil
            </Button>
          )}
        </ButtonContainer>
        {error && <Error>{error}</Error>}
      </Form>
    </Container>
  );
};

export default ReportCardPage;

// Styles
const Container = styled.div`
  padding: 20px;
  margin: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  max-width: 1500px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const StudentName = styled.h3`
  font-size: 24px;
  color: #333;
  font-family: "Open Sans", sans-serif;
  margin-bottom: 10px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
  display: block;
`;

const Button = styled.button`
  padding: 10px;
  margin: 5px 0;
  background-color: #041d75;
  color: white;
  border: none;
  cursor: pointer;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  border-radius: 6px;
  font-size: 18px;
  padding: 10px 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ToggleButton = styled(Button)`
  background-color: #6c757d;
  width: 200px;
  align-self: center;

  &:hover {
    background-color: #5a6268;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  width: 60%;

  font-size: 14px;
  font-family: "Open Sans", sans-serif;
`;

const Error = styled.div`
  color: red;
  margin-top: 10px;
`;

const SkillsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  padding-left: 50px;
  margin-top: 20px;
  background-color: #f1f1f1;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SkillDiv = styled.div`
  width: 450px;

  @media (max-width: 768px) {
    width: auto;
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  color: #f1f1f1;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  background-color: #041d75;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background-color: #041d75;
  margin-bottom: 10px;
`;

const PupilDetailsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InputWrapper = styled.div`
  flex: 1;
  min-width: 200px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ToggleSectionIcon = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    color: #014083;
  }
`;
