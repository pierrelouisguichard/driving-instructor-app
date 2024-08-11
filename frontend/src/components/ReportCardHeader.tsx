// components/ReportCardHeader.tsx
import React from "react";
import styled from "styled-components";
import logo from "../assets/Driving_School.png";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
}

const ReportCardHeader: React.FC<Props> = ({ title }) => {
  const navigate = useNavigate();

  const navigateHome = () => {
    console.log("Logo clicked");
    navigate("/");
  };

  return (
    <StyledHeader>
      <HeaderContainer>
        <Logo src={logo} alt="Driving School Logo" onClick={navigateHome} />
        <StyledH1>{title}</StyledH1>
      </HeaderContainer>
    </StyledHeader>
  );
};

export default ReportCardHeader;

// Styles
const StyledHeader = styled.header`
  height: 170px;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  display: flex;
  justify-content: center;
  @media (max-width: 800px) {
    height: 250px;
    border-radius: 0 0 30px 30px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const HeaderContainer = styled.div`
  width: 1500px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 50px;
  @media (max-width: 800px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const Logo = styled.img`
  width: 160px;
  height: auto;
  cursor: pointer;
`;

const StyledH1 = styled.h1`
  font-size: 1.8rem;
  margin: 0;
  color: ${(props) => props.theme.colors.text};
  @media (max-width: 800px) {
    font-size: 1.5rem;
  }
`;
