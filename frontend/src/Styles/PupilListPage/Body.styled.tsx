import styled, { keyframes } from "styled-components";
import { FaChevronRight } from "react-icons/fa";

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

export const StyledBody = styled.div`
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  animation: ${fadeIn} 1s ease-out;
`;

export const PupilButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: left;
  width: 100%;
  max-width: 1500px;
`;

export const StyledPupilButton = styled.button`
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

export const StyledFaChevronRight = styled(FaChevronRight)`
  font-size: 20px;
`;
