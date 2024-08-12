import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ScrollButton = styled.button<{ $show: boolean }>`
  position: fixed;
  width: 50px;
  height: 50px;
  bottom: 20px;
  right: 20px;
  background-color: ${(props) => props.theme.colors.primary};
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;

  &:hover {
    background-color: white;
    color: ${(props) => props.theme.colors.primary};
  }
`;

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <ScrollButton $show={visible} onClick={scrollToTop}>
      <FontAwesomeIcon icon={faArrowUp} />
    </ScrollButton>
  );
};

export default ScrollToTopButton;
