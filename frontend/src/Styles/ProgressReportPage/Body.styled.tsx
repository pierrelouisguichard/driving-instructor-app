import styled, { keyframes } from "styled-components";

// Keyframes for fade in
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Keyframes for fade out
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Container = styled.div`
  padding: 20px;
  margin: auto;
  max-width: 1500px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// Pupil Details Section
export const PupilDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  width: 100%;
  margin: auto;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (min-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
  }
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 360px;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

// Skill Sections
export const ToggleButton = styled.button`
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

// Bottom Buttons
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Button = styled.button`
  padding: 10px;
  margin: 5px 0;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  border-radius: 6px;
  font-size: 18px;
  padding: 10px 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #074180;
  }
`;

// Error
export const Error = styled.div`
  color: red;
  margin-top: 10px;
  animation: ${fadeOut} 0.5s ease-in-out;
`;
