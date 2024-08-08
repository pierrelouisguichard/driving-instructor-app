import React, { useEffect, useState } from "react";
import { PupilWithID } from "../interface/Interfaces";
import { useNavigate } from "react-router-dom";
import { fetchAllPupils } from "../services/apiServices";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  faArrowRightFromBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  PupilButtonsContainer,
  StyledBody,
  StyledFaChevronRight,
  StyledPupilButton,
} from "../Styles/PupilListPage/Body.styled";
import {
  StyledHeader,
  Logo,
  StyledAddButton,
  StyledContainer,
  HeaderContainer,
  IconContainer,
  StyledFaSignOut,
  StyledH1,
  BoldText,
  StyledText,
} from "../Styles/PupilListPage/Header.styled";
import logo from "../assets/Driving_School.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PupilListPage: React.FC = () => {
  const [pupilsList, setPupilsList] = useState<PupilWithID[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  useEffect(() => {
    const loadPupils = async () => {
      if (user) {
        try {
          const data = await fetchAllPupils(user);
          setPupilsList(data);
        } catch (error) {
          setError("Failed to fetch pupils. Please try again later.");
        }
      }
    };

    loadPupils();
  }, [user]);

  const handleNavigate = (pupilId: string): void => {
    navigate(`/card/${pupilId}`);
  };

  const handleNew = (): void => {
    navigate("/card");
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (pupilsList === null) {
    return <div>Loading...</div>;
  }

  const handleLogOut = () => {
    logout();
  };

  return (
    <>
      <StyledHeader>
        <HeaderContainer>
          <Logo src={logo} alt="Driving School Logo" />
          <StyledContainer>
            <StyledH1>Welcome back!</StyledH1>
            <StyledText>Logged in as: {user?.email}</StyledText>
            <StyledText>
              You have <BoldText>{pupilsList.length}</BoldText> pupils.
            </StyledText>
          </StyledContainer>
          <IconContainer>
            <StyledFaSignOut
              icon={faArrowRightFromBracket}
              onClick={handleLogOut}
            />
            <StyledAddButton onClick={handleNew}>
              <FontAwesomeIcon icon={faUserPlus} />
            </StyledAddButton>
          </IconContainer>
        </HeaderContainer>
      </StyledHeader>

      <StyledBody>
        {pupilsList.length === 0 ? (
          <div className="no-pupils-message">No pupils found.</div>
        ) : (
          <PupilButtonsContainer>
            {pupilsList.map((pupil) => (
              <StyledPupilButton
                key={pupil._id}
                onClick={() => handleNavigate(pupil._id)}
              >
                {`${pupil.firstName} ${pupil.lastName}`}
                <StyledFaChevronRight />
              </StyledPupilButton>
            ))}
          </PupilButtonsContainer>
        )}
      </StyledBody>
    </>
  );
};

export default PupilListPage;
