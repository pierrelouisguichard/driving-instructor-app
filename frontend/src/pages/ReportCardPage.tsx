import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pupil } from "../interface/Interfaces";
import {
  deletePupil,
  fetchSinglePupil,
  savePupil,
  sendProgressReport,
} from "../services/apiServices";
import formatProgressReport from "../utils/formatProgressReport";
import {
  defaultNoviceSkillsList,
  defaultIntermediateSkillsList,
  defaultAdvancedSkillsList,
} from "../models/drivingSkillsList";
import ConfirmationDialog from "../components/ConfirmationDialog";
import PupilDetailsForm from "../components/PupilDetailsForm";
import SkillsSection from "../components/SkillsSection";
import ReportCardHeader from "../components/ReportCardHeader";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import styled, { keyframes } from "styled-components";

/*
 * This is the Report Card page (/card). It is used to:
 * - Create a new pupil if no ID is present in the URL.
 * - Edit and update the details of an existing pupil if an ID is included in the URL.
 * - Fill out and send the progress record.
 */
const ReportCardPage: React.FC = () => {
  const [showPupilDetails, setShowPupilDetails] = useState(true);
  const { id } = useParams<{ id: string }>();
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
  const [visibleSections, setVisibleSections] = useState({
    novice: false,
    intermediate: false,
    advanced: false,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogDescription, setDialogDescription] = useState("");
  const [dialogAction, setDialogAction] = useState<(() => void) | null>(null);
  const [singleButton, setSingleButton] = useState(false);
  const { logout } = useLogout();

  useEffect(() => {
    if (id) {
      setShowPupilDetails(false);
      if (user) {
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
    } else {
      setShowPupilDetails(true);
    }
  }, [id, user]);

  const handlePreviewReport = async () => {
    if (!user) {
      setError("You must be logged in");
      return;
    }
    const pupil: Pupil = {
      firstName,
      lastName,
      eMail,
      noviceSkillsList,
      intermediateSkillsList,
      advancedSkillsList,
    };
    try {
      await savePupil(id, pupil, user);
      navigate("/report", { state: { pupil } });
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setDialogOpen(false);
    }
  };

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
          { to: eMail, subject: "Your Progress Report", html: reportHtml },
          user
        );
        alert("Report sent successfully");
        setDialogOpen(false);
      } catch (error) {
        alert((error as Error).message);
        setDialogOpen(false);
      }
    });
    setSingleButton(false);
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
      setSingleButton(true);
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
    setSingleButton(false);
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
      setSingleButton(false);
      setDialogOpen(true);
    }
  };

  const toggleSectionVisibility = (section: keyof typeof visibleSections) => {
    setVisibleSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <>
      <ReportCardHeader
        title={
          id ? `${firstName} ${lastName}'s Progress Record` : "Add a New Pupil"
        }
      />
      <Container>
        <Form onSubmit={handleSubmit}>
          <PupilDetailsForm
            firstName={firstName}
            lastName={lastName}
            eMail={eMail}
            onChangeFirstName={handleInputChange(setFirstName)}
            onChangeLastName={handleInputChange(setLastName)}
            onChangeEmail={handleInputChange(setEMail)}
            showPupilDetails={showPupilDetails}
            togglePupilDetails={() => setShowPupilDetails(!showPupilDetails)}
          />
          <SkillsSection
            title="Novice"
            skillsList={noviceSkillsList}
            setSkills={setNoviceSkills}
            visible={visibleSections.novice}
            onToggle={() => toggleSectionVisibility("novice")}
          />
          <SkillsSection
            title="Intermediate"
            skillsList={intermediateSkillsList}
            setSkills={setIntermediateSkills}
            visible={visibleSections.intermediate}
            onToggle={() => toggleSectionVisibility("intermediate")}
          />
          <SkillsSection
            title="Advanced"
            skillsList={advancedSkillsList}
            setSkills={setAdvancedSkills}
            visible={visibleSections.advanced}
            onToggle={() => toggleSectionVisibility("advanced")}
          />
          <ButtonContainer>
            <Button type="submit">{id ? "Save Changes" : "Add Pupil"}</Button>
            {id && (
              <>
                <Button type="button" onClick={handleSendReport}>
                  Send Report via Email
                </Button>
                <Button type="button" onClick={handlePreviewReport}>
                  Preview Report
                </Button>
                <Button
                  style={{ backgroundColor: "#830505" }}
                  type="button"
                  onClick={handleDelete}
                >
                  Delete Pupil
                </Button>
              </>
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
          singleButton={singleButton}
        />
      </Container>
    </>
  );
};

export default ReportCardPage;

// Keyframes for fade in
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  padding-top: 20px;
  margin: auto;
  max-width: 1500px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 20px;
  padding-right: 20px;
`;

// Bottom Buttons
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 10px;
  margin: 5px 0;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  font-size: 18px;
  border-radius: 6px;
  padding: 10px 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.primary};
  }
`;

// Error
const Error = styled.div`
  color: red;
  margin-top: 10px;
`;
