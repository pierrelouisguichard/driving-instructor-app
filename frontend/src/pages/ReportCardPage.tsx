import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleRight,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
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
import ConfirmationDialog from "../components/ConfirmationDialog";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  HeaderContainer,
  Logo,
  StyledFaSignOut,
  StyledH1,
  StyledHeader,
} from "../Styles/ProgressReportPage/Header.styled";
import logo from "../assets/Driving_School.png";
import { useLogout } from "../hooks/useLogout";
import {
  Button,
  ButtonContainer,
  Container,
  Form,
  Input,
  Label,
  PupilDetailsContainer,
  ToggleButton,
  Error,
  FieldWrapper,
} from "../Styles/ProgressReportPage/Body.styled";

/*
 * This is the Report Card page (/card). It is used to:
 * - Create a new pupil if no ID is present in the URL.
 * - Edit and update the details of an existing pupil if an ID is included in the URL.
 * - Fill out and send the progress record.
 */
const ReportCardPage: React.FC = () => {
  const [showPupilDetails, setShowPupilDetails] = useState<boolean>(false);
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
  const { user } = useAuthContext();

  // State to track visibility of each skills section
  const [visibleSections, setVisibleSections] = useState({
    novice: false,
    intermediate: false,
    advanced: false,
  });

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const { logout } = useLogout();
  const [dialogDescription, setDialogDescription] = useState("");
  const [dialogAction, setDialogAction] = useState<(() => void) | null>(null);
  const [singleButton, setSingleButton] = useState<boolean>(false); // New state for single button dialog

  // This method fetches pupil details and populates the fields if an ID is present in the URL.
  useEffect(() => {
    if (id) {
      setShowPupilDetails(false);
    } else {
      setShowPupilDetails(true);
    }
    if (id && user) {
      const fetchData = async () => {
        try {
          const pupil = await fetchSinglePupil(id, user);
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
  }, [id, user]);

  const handleSendReport = () => {
    if (!user) {
      setError("You must be logged in");
      return;
    }
    setDialogTitle("Send Report");
    setDialogDescription(
      `Are you sure you want to send the report for <strong>${firstName} ${lastName}</strong>?`
    );
    setDialogAction(() => async () => {
      const reportHtml = formatProgressReport({
        firstName,
        lastName,
        eMail,
        noviceSkillsList,
        intermediateSkillsList,
        advancedSkillsList,
      });

      try {
        await sendProgressReport(
          {
            to: eMail,
            subject: "Your Progress Report",
            html: reportHtml,
          },
          user
        );
        alert("Report sent successfully");
        setDialogOpen(false);
      } catch (error) {
        alert((error as Error).message);
        setDialogOpen(false);
      }
    });
    setSingleButton(false); // Set to false since we want both confirm and cancel buttons
    setDialogOpen(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }
    if (!firstName || !lastName || !eMail) {
      setDialogTitle("Missing Information");
      setDialogDescription(
        `The following fields cannot be empty <strong>:\n${
          !firstName ? "First Name,\n\n\n" : ""
        }${!lastName ? "Last Name,\n\n\n" : ""}${
          !eMail ? "Email Address" : ""
        }</strong>`
      );
      setSingleButton(true); // Show only one button (Okay) for missing information
      setDialogOpen(true);
      return;
    }

    setDialogTitle(id ? "Save Changes" : "Add Pupil");
    setDialogDescription(
      id
        ? `Are you sure you want to save changes for <strong>${firstName} ${lastName}</strong>?`
        : `Are you sure you want to add <strong>${firstName} ${lastName}</strong>?`
    );
    setDialogAction(() => async () => {
      const pupil = {
        firstName,
        lastName,
        eMail,
        noviceSkillsList,
        intermediateSkillsList,
        advancedSkillsList,
      };

      try {
        await savePupil(id, pupil, user);
        navigate("/");
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setDialogOpen(false);
      }
    });
    setSingleButton(false); // Set to false since we want both confirm and cancel buttons
    setDialogOpen(true);
  };

  const handleDelete = () => {
    if (id && user) {
      setDialogTitle("Delete Pupil");
      setDialogDescription(
        `Are you sure you want to delete the pupil:\n<strong>${firstName} ${lastName}</strong>\n with email <strong>${eMail}</strong>?`
      );
      setDialogAction(() => async () => {
        try {
          const result = await deletePupil(id, user);
          if (result.success) {
            navigate("/");
          }
        } catch (error) {
          setError((error as Error).message);
        } finally {
          setDialogOpen(false);
        }
      });
      setSingleButton(false); // Set to false since we want both confirm and cancel buttons
      setDialogOpen(true);
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
    sectionKey: keyof typeof visibleSections
  ) => (
    <>
      <ToggleButton
        type="button"
        onClick={() => toggleSectionVisibility(sectionKey)}
      >
        <FontAwesomeIcon
          icon={visibleSections[sectionKey] ? faAngleDown : faAngleRight}
          size="lg"
        />{" "}
        {title}
      </ToggleButton>
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
    </>
  );

  const togglePupilDetails = () => {
    setShowPupilDetails((prevState) => !prevState);
  };

  const handleLogOut = () => {
    logout();
  };

  return (
    <>
      <StyledHeader>
        <HeaderContainer>
          {" "}
          <Logo src={logo} alt="Driving School Logo" />
          <StyledH1>
            {id
              ? `${firstName} ${lastName}'s Progress Record`
              : "Add a New Pupil"}
          </StyledH1>
          <StyledFaSignOut
            icon={faArrowRightFromBracket}
            onClick={handleLogOut}
          />
        </HeaderContainer>
      </StyledHeader>

      <Container>
        <Form onSubmit={handleSubmit}>
          <ToggleButton type="button" onClick={togglePupilDetails}>
            <FontAwesomeIcon
              icon={showPupilDetails ? faAngleDown : faAngleRight}
              size="lg"
            />{" "}
            Pupil Details
          </ToggleButton>
          {showPupilDetails && (
            <>
              <PupilDetailsContainer>
                <FieldWrapper>
                  <Label>First Name:</Label>
                  <Input
                    type="text"
                    onChange={handleInputChange(setFirstName)}
                    value={firstName}
                  />
                </FieldWrapper>

                <FieldWrapper>
                  <Label>Last Name:</Label>
                  <Input
                    type="text"
                    onChange={handleInputChange(setLastName)}
                    value={lastName}
                  />
                </FieldWrapper>

                <FieldWrapper>
                  <Label>Email:</Label>
                  <Input
                    type="email"
                    onChange={handleInputChange(setEMail)}
                    value={eMail}
                  />
                </FieldWrapper>
              </PupilDetailsContainer>
            </>
          )}

          {renderSkillsSection(
            "NOVICE",
            noviceSkillsList,
            setNoviceSkills,
            "novice"
          )}
          {renderSkillsSection(
            "INTERMEDIATE",
            intermediateSkillsList,
            setIntermediateSkills,
            "intermediate"
          )}
          {renderSkillsSection(
            "ADVANCED",
            advancedSkillsList,
            setAdvancedSkills,
            "advanced"
          )}

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
                onClick={handleDelete}
              >
                Delete Pupil
              </Button>
            )}
          </ButtonContainer>
          {error && <Error>{error}</Error>}
        </Form>

        <ConfirmationDialog
          open={dialogOpen}
          title={dialogTitle}
          description={dialogDescription}
          onConfirm={() => {
            if (dialogAction) dialogAction();
          }}
          onCancel={() => setDialogOpen(false)}
          singleButton={singleButton} // Pass the new singleButton prop to the dialog
        />
      </Container>
    </>
  );
};

export default ReportCardPage;
