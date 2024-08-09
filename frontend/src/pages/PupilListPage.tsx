import React, { useEffect, useState } from "react";
import { PupilWithID } from "../interface/Interfaces";
import { useNavigate } from "react-router-dom";
import { fetchAllPupils } from "../services/apiServices";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import PupilListHeader from "../components/PupilListHeader"; // Import the new Header component
import styled, { keyframes } from "styled-components";
import { FaChevronRight } from "react-icons/fa";

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
      <PupilListHeader
        user={user}
        pupilsList={pupilsList}
        handleNew={handleNew}
        handleLogOut={handleLogOut}
        handleNavigate={handleNavigate}
      />

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

// body
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledBody = styled.div`
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  animation: ${fadeIn} 1s ease-out;
`;

const PupilButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: left;
  width: 100%;
  max-width: 1500px;
`;

const StyledPupilButton = styled.button`
  background-color: ${(props) => props.theme.colors.buttonBackground};
  color: ${(props) => props.theme.colors.secondaryText};
  border: none;
  border-radius: 5px;
  width: 100%;
  max-width: 360px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.text};
  }

  @media (max-width: 800px) {
    width: 100vw;
    max-width: none;
  }
`;

const StyledFaChevronRight = styled(FaChevronRight)`
  font-size: 20px;
`;
