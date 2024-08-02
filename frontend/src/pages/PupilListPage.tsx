import React, { useEffect, useState } from "react";
import { PupilWithID } from "../interface/Interfaces";
import { useNavigate } from "react-router-dom";
import { fetchAllPupils } from "../services/apiServices";
import styled from "styled-components";

// This is the landing page which displays a list of all pupils.
const PupilListPage: React.FC = () => {
  const [pupilsList, setPupilsList] = useState<PupilWithID[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetches a list of all pupils
  useEffect(() => {
    const loadPupils = async () => {
      try {
        const data = await fetchAllPupils();
        setPupilsList(data);
      } catch (error) {
        setError("Failed to fetch pupils. Please try again later.");
      }
    };

    loadPupils();
  }, []);

  const handleNavigate = (pupilId: string): void => {
    navigate(`/card/${pupilId}`);
  };

  const handleNew = (): void => {
    navigate("/card");
  };

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (pupilsList === null) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  return (
    <Container>
      <Title>Pupil List</Title>
      <Button onClick={handleNew}>New</Button>

      {pupilsList.length === 0 ? (
        <NoPupilsMessage>No pupils found.</NoPupilsMessage>
      ) : (
        // Display each pupil's name in a button for navigation
        <PupilListContainer>
          {pupilsList.map((pupil) => (
            <PupilButton
              key={pupil._id}
              onClick={() => handleNavigate(pupil._id)}
            >
              {`${pupil.firstName} ${pupil.lastName}`}
            </PupilButton>
          ))}
        </PupilListContainer>
      )}
    </Container>
  );
};

export default PupilListPage;

// Styles
const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const PupilListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PupilButton = styled.button`
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 20px 0;
`;

const LoadingMessage = styled.div`
  margin: 20px 0;
`;

const NoPupilsMessage = styled.div`
  margin: 20px 0;
`;
