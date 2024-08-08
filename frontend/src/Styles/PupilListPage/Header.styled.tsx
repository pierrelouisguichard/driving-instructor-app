import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const StyledHeader = styled.header`
  padding: 20px;
  height: 200px;
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

export const HeaderContainer = styled.div`
  width: 1500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 800px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

export const Logo = styled.img`
  width: 160px;
  height: auto;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 800px) {
    flex-direction: row;
    gap: 130px;
  }
`;

export const StyledAddButton = styled.button`
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

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  gap: 0.5rem; /* Add spacing between elements */
`;

export const StyledH1 = styled.h1`
  font-size: 2rem;
  margin: 0;
  color: ${(props) => props.theme.colors.text};
  @media (max-width: 800px) {
    font-size: 1.5rem;
  }
`;

export const StyledText = styled.p`
  font-size: 1.2rem;
  margin: 0;
  color: ${(props) => props.theme.colors.text};
  @media (max-width: 800px) {
    font-size: 1rem;
  }
`;

export const BoldText = styled.span`
  font-weight: bold;
`;

export const StyledFaSignOut = styled(FontAwesomeIcon)`
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
