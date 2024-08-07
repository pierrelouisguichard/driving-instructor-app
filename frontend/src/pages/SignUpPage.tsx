import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSignUp } from "../hooks/useSignUp";

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signUp, error, isLoading } = useSignUp();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await signUp(email, password);
  };

  return (
    <SignUpContainer>
      <Title>Sign Up</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <SubmitButton disabled={isLoading} type="submit">
          Sign Up
        </SubmitButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
      <BackToLoginButton onClick={() => navigate("/login")}>
        Login
      </BackToLoginButton>
    </SignUpContainer>
  );
};

export default SignUpPage;

// Styles
const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const BackToLoginButton = styled.button`
  margin-top: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #6c757d;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5a6268;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;
