import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { theme } from "../Styles/Theme";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <NotFoundContainer>
      <Content>
        <NotFoundText>Page Not Found</NotFoundText>
        <NotFoundSubText>
          The page you are looking for does not exist.
        </NotFoundSubText>
        <HomeButton onClick={() => navigate("/")}>Go Home</HomeButton>
      </Content>
    </NotFoundContainer>
  );
};

export default PageNotFound;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const float = keyframes`
  0% { transform: translateY(-10px); }
  50% { transform: translateY(15px); }
  100% { transform: translateY(-10px); }
`;

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #0a192f;
  color: white;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
`;

const Content = styled.div`
  animation: ${float} 3s ease-in-out infinite;
`;

const NotFoundText = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: ${theme.colors.secondary};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const NotFoundSubText = styled.p`
  font-size: 1.25rem;
  margin-bottom: 40px;
  color: ${theme.colors.text};
  opacity: 0.9;
`;

const HomeButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: ${theme.colors.primary};
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background-color: ${theme.colors.secondary};
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    transform: scale(1.05);
  }
`;
