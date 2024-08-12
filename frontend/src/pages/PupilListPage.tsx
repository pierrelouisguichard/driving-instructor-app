import React, { useEffect, useState } from "react";
import { PupilWithID } from "../interface/Interfaces";
import { useNavigate } from "react-router-dom";
import { fetchAllPupils } from "../services/apiServices";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import PupilListHeader from "../components/PupilListHeader";
import styled, { keyframes } from "styled-components";
import { FaChevronRight, FaSearch } from "react-icons/fa";

const PupilListPage: React.FC = () => {
  const [pupilsList, setPupilsList] = useState<PupilWithID[] | null>(null);
  const [filteredPupilsList, setFilteredPupilsList] = useState<PupilWithID[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();
  
// all changes
//filteredPupilsList: To store the filtered list of pupils based on the search term.
//searchTerm: To store the current search input.
//isSearchVisible: To toggle the visibility of the search input.
//toggleSearch: To show/hide the search input.
//added a new useEffect hook that filters the pupils list whenever the searchTerm changes.
//created a new SearchContainer component that includes a search icon and an input field.
//updated the rendering logic to use filteredPupilsList instead of pupilsList when displaying pupils.

  useEffect(() => {
    const loadPupils = async () => {
      if (user) {
        try {
          const data = await fetchAllPupils(user);
          setPupilsList(data);
          setFilteredPupilsList(data);
        } catch (error) {
          setError("Failed to fetch pupils. Please try again later.");
        }
      }
    };
    loadPupils();
  }, [user]);

  useEffect(() => {
    if (pupilsList) {
      const filtered = pupilsList.filter((pupil) =>
        `${pupil.firstName} ${pupil.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPupilsList(filtered); //store the filtered list of pupils based on the search term.
    }
  }, [searchTerm, pupilsList]);

  const handleNavigate = (pupilId: string): void => {
    navigate(`/card/${pupilId}`);
  };

  const handleNew = (): void => {
    navigate("/card");
  };

  const handleLogOut = () => {
    logout();
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (isSearchVisible) {
      setSearchTerm("");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (pupilsList === null) {
    return <div>Loading...</div>;
  }
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
        <SearchContainer> 
          <SearchIcon onClick={toggleSearch}>
            <FaSearch />
          </SearchIcon>
          {isSearchVisible && (
            <SearchInput
              type="text"
              placeholder="Search pupils..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        </SearchContainer>
        {filteredPupilsList && filteredPupilsList.length === 0 ? (
          <NoPupilsMessage>No pupils found.</NoPupilsMessage>
        ) : (
          <PupilButtonsContainer>
            {filteredPupilsList &&
              filteredPupilsList.map((pupil) => (
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
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 1500px;
`;

//search bar+icon styling
const SearchIcon = styled.div`
  cursor: pointer;
  border: none;
  font-size: 1.5rem;
  margin-right: 10px;
  color: ${(props) => props.theme.colors.primary};
  &:hover {
    scale: 1.4 
  }

  @media (max-width: 800px) {
    font-size: 1.2rem;
    &:hover { scale: none }
  }
`;

const NoPupilsMessage = styled.div`
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.primary};
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 5px;
  outline: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.background};
  transition: border 0.3s ease;
  
`;
