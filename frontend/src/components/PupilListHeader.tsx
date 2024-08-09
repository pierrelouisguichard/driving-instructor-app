import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/Driving_School.png";
import { PupilWithID } from "../interface/Interfaces";

interface HeaderProps {
  user: { email: string } | null;
  pupilsList: PupilWithID[] | null;
  handleNew: () => void;
  handleLogOut: () => void;
  handleNavigate: (pupilId: string) => void;
}

const PupilListHeader: React.FC<HeaderProps> = ({
  user,
  pupilsList,
  handleNew,
  handleLogOut,
}) => {
  return (
    <StyledHeader>
      <HeaderContainer>
        <Logo src={logo} alt="Driving School Logo" />
        <StyledContainer>
          <StyledH1>Welcome back!</StyledH1>
          <StyledText>Logged in as: {user?.email}</StyledText>
          <StyledText>
            You have <BoldText>{pupilsList?.length || 0}</BoldText> pupils.
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
  );
};

export default PupilListHeader;

// styled components
const StyledHeader = styled.header`
  padding: 20px;
  height: 170px;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  display: flex;
  justify-content: center;
  @media (max-width: 800px) {
    padding: 20px;
    height: 380px;
    border-radius: 0 0 30px 30px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const HeaderContainer = styled.div`
  width: 1500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 800px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
`;

const Logo = styled.img`
  width: 160px;
  height: auto;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 800px) {
    flex-direction: row;
    gap: 80px;
  }
`;

const StyledAddButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  border: none;
  border-radius: 50px;
  padding: 15px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.primary};
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  padding-left: 50px;
  margin-right: auto;
  @media (max-width: 800px) {
    margin: auto;
  }
`;

const StyledH1 = styled.h1`
  font-size: 2rem;
  margin: 0;
  color: ${(props) => props.theme.colors.text};
  @media (max-width: 800px) {
    font-size: 1.5rem;
  }
`;

const StyledText = styled.p`
  font-size: 1.2rem;
  margin: 0;
  color: ${(props) => props.theme.colors.text};
  @media (max-width: 800px) {
    font-size: 1rem;
  }
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const StyledFaSignOut = styled(FontAwesomeIcon)`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  border: none;
  border-radius: 50px;
  padding: 15px;
  font-size: 20px;
  cursor: pointer;
  margin-bottom: 30px;

  @media (max-width: 800px) {
    margin-bottom: 0px;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.primary};
  }
`;
