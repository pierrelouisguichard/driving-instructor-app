import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLogin } from "../hooks/useLogin";
import LineForLoginPage from "../components/LineForLoginPage";
import logo from "../assets/Driving_School.png";
import backgroundImage from '../assets/test_image.png'; 
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await login(email, password);
  };

  return (
    <PageContainer>
      <ContentContainer>  
        <LoginContainer>
        <LogoContainer>
              <Logo src={logo} alt="Chelsea Driving School" />
        </LogoContainer>
          <FormContainer>
            <Heading>Login to Your Account</Heading>
            <LineForLoginPage />
            <Form onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <SubmitButton disabled={isLoading} type="submit">
                Login In
              </SubmitButton>
            </Form>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </FormContainer>
        </LoginContainer>
        <SignUpContainer>
          <SignUpText>New Here?</SignUpText>
          <SignUpButton onClick={() => navigate("/signup")}>Sign Up</SignUpButton>
        </SignUpContainer>
      </ContentContainer>
    </PageContainer>
  );
}

export default LoginPage;

// Styles
const PageContainer = styled.div`
  display: flex;
  padding: none;
  width: 100%;
  height: 100vh;
  border: none;
  // this is a test image as a placeholder
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
   flex-direction: column;
   align-items: center;
   background-color: white;
   background-size: cover;
 }
`;

const ContentContainer = styled.div`
  display: flex;
  width: 45%;
  height: 60%;
  margin: auto;
  background-color: white;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
   height: 100%;
   flex-direction: column;
   box-shadow: none;
   width: 100%;
    margin: 0;
    margin-bottom: none;
 }

`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
  padding: 2rem;
  background-color: #ffffff;

  @media (max-width: 768px) {
   width: 350px;
   height: 30%;
   padding: none;
   background-color: #213260;
   border-bottom-left-radius: 30px;
   border-bottom-right-radius: 30px;
 }

`;


const LogoContainer = styled.div`
  text-align: top-left;
  margin-left: 2rem;

 @media (max-width: 768px) {
   margin-left: 1rem;
 }
`;

const Logo = styled.img`
  max-width: 200px;

 @media (max-width: 768px) {
   max-width: 150px;
 }
`;

const FormContainer = styled.div`
  margin-top: 3rem;
  max-width: 400px;
  width: 100%;
  align-self: center;

  @media (max-width: 768px) {
   margin-top: 2rem;
   align-self: center;
   width: 80%;
   padding: 0;

 }
`;

const Heading = styled.h2`
  color: #213260;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: bold;
  font-family: "Open Sans", sans-serif;

  @media (max-width: 768px) {
   font-size: 1.5rem;
   margin-bottom: 1.5rem;
   color: white;
 }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 1.5rem;
  color: #213260;
  padding: 0.75rem;
  border: none;
  border-radius: 0.65rem;
  font-size: 1rem;
  background-color: #e6eaf7;

    input.placeholder {
    color: #213260;
  }

  @media (max-width: 768px) {
   padding: 0.5rem;
   font-size: 0.9rem;
 }
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  margin-top: 2rem;
  width: 50%;
  font-weight: bold;
  font-family: "Open Sans", sans-serif;
  align-self: center;
  background-color: #213260;
  color: white;
  border: none;
  border-radius: 0.65rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1c3377;
  }

  @media (max-width: 768px) {
   padding: 0.5rem;
   font-size: 0.9rem;
   width: 60%;
 }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 1rem;
`;

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 16%;
  background-color: #213260;
  padding: 7rem;

  @media (max-width: 768px) {
   width: 100%;
   height: 50%;
   padding: 2rem;
   background-color: white;
 }

`;

const SignUpText = styled.p`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 4rem;
  text-align: center;
  font-weight: bold;
  font-family: "Open Sans", sans-serif;

  @media (max-width: 768px) {
   font-size: 1.2rem;
   margin-bottom: 2rem;
 }
`;

const SignUpButton = styled.button`
  padding: 0.75rem;
  width: 250px;
  margin-bottom: 7rem;
  background-color: white;
  color: #213260;
  border: none;
  border-radius: 0.65rem;
  font-size: 1rem;
  font-weight: bold;
  font-family: "Open Sans", sans-serif;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 768px) {
   padding: 0.5rem;
   width: 200px;
   font-size: 0.9rem;
   margin-bottom: 3rem;
 }
`;
