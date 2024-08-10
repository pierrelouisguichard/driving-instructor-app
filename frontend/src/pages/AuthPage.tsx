import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLogin } from "../hooks/useLogin";
import { useSignUp } from "../hooks/useSignUp";
import logo from "../assets/Driving_School.png";
import backgroundImage from "../assets/test_image.png";

type AuthPageProps = {
  mode: "login" | "signup";
};

const AuthPage: React.FC<AuthPageProps> = ({ mode }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const { login, error: loginError, isLoading: loginLoading } = useLogin();
  const { signUp, error: signUpError, isLoading: signUpLoading } = useSignUp();

  const isLoginMode = mode === "login";
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isLoginMode) {
      await login(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <PageContainer mode={mode}>
      <ContentContainer>
        <LeftContainer mode={mode}>
          <Logo src={logo} alt="Chelsea Driving School" />
          <FormContainer>
            <LeftTitle mode={mode}>
              {isLoginMode ? "Login to Your Account" : "Create Your Account"}
            </LeftTitle>
            <HorizontalLine mode={mode} />
            <Form onSubmit={handleSubmit}>
              <Input
                mode={mode}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                mode={mode}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <LeftButton
                mode={mode}
                disabled={isLoginMode ? loginLoading : signUpLoading}
                type="submit"
              >
                {isLoginMode ? "Login" : "Sign Up"}
              </LeftButton>
            </Form>
            {(isLoginMode ? loginError : signUpError) && (
              <ErrorMessage>
                {isLoginMode ? loginError : signUpError}
              </ErrorMessage>
            )}
          </FormContainer>
        </LeftContainer>
        <RightContainer mode={mode}>
          <RightTitle mode={mode}>
            {isLoginMode ? "New Here?" : "Already have an Account?"}
          </RightTitle>
          <RightButton
            mode={mode}
            onClick={() => navigate(isLoginMode ? "/signup" : "/login")}
          >
            {isLoginMode ? "Sign Up" : "Login"}
          </RightButton>
        </RightContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default AuthPage;

// Syles
const blue = (mode: "login" | "signup"): string => {
  return mode === "login" ? "#213260" : "white";
};

const white = (mode: "login" | "signup"): string => {
  return mode === "login" ? "white" : "#213260";
};

const inputColour = (mode: "login" | "signup"): string => {
  return mode === "login" ? "white" : "#eceff7";
};

// Entire Page
const PageContainer = styled.div<AuthPageProps>`
  width: 100vw;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 800px) {
    background-color: ${(props) => white(props.mode)};
    background-image: none;
  }
`;

const ContentContainer = styled.div`
  width: 90%;
  height: 60%;
  max-width: 1000px;
  min-height: 700px;
  display: flex;

  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
`;

// Left Container
const LeftContainer = styled.div<AuthPageProps>`
  flex: 3;
  background-color: ${(props) => blue(props.mode)};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px 0 0 10px;
  position: relative;
  @media (max-width: 800px) {
    flex: 5;
    border-radius: 0 0 40px 40px;
  }
`;

const Logo = styled.img`
  max-width: 190px;
  position: absolute;
  top: 7%;
  left: 10%;
  @media (max-height: 800px) {
    max-width: 140px;
  }
`;

const FormContainer = styled.div`
  width: 80%;
`;

const LeftTitle = styled.h2<AuthPageProps>`
  color: ${(props) => white(props.mode)};
  margin-top: 4rem;
  margin-bottom: 2rem;
  text-align: center;
  @media (max-width: 800px) {
    margin-top: 7rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input<AuthPageProps>`
  margin-bottom: 1rem;
  color: ${(props) => white(props.mode)};
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 5px;
  background-color: ${(props) => inputColour(props.mode)};
  border: none;
`;

const LeftButton = styled.button<AuthPageProps>`
  padding: 0.75rem;
  margin-top: 2rem;
  width: 300px;
  font-weight: bold;
  font-family: "Open Sans", sans-serif;
  align-self: center;
  background-color: ${(props) => white(props.mode)};
  color: ${(props) => blue(props.mode)};
  border: none;
  border-radius: 0.65rem;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.5s ease, opacity 0.5s ease;

  &:hover {
    transform: scale(1.1);
    opacity: 0.9;
  }
`;

// Right Container
const RightContainer = styled.div<AuthPageProps>`
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => white(props.mode)};
  border-radius: 0 10px 10px 0;
`;

const RightTitle = styled.h3<AuthPageProps>`
  color: ${(props) => blue(props.mode)};
  margin-bottom: 2rem;
  @media (max-width: 800px) {
    margin-top: -2rem;
  }
`;

const RightButton = styled.button<AuthPageProps>`
  padding: 0.75rem;
  width: 300px;
  background-color: ${(props) => blue(props.mode)};
  color: ${(props) => white(props.mode)};
  border: none;
  border-radius: 0.65rem;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.5s ease, opacity 0.5s ease;

  &:hover {
    transform: scale(1.1);
    opacity: 0.9;
  }
`;

// Other
const HorizontalLine = styled.hr<AuthPageProps>`
  border: 0;
  height: 2px;
  background: ${(props) => white(props.mode)};
  margin-bottom: 3rem;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 1rem;
`;
