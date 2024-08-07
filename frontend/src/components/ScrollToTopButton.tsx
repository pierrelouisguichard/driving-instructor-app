//@ts-nocheck
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ScrollButton = styled.button`
  position: fixed;
  width: 50px;
  height: 50px;
  bottom: 20px;
  right: 40px;
  padding-bottom: 7px;
  background-color: #041d75;
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: ${({ show }: { show: boolean }) => (show ? "block" : "none")};
  transition: opacity 0.3s;

  &:hover {
    background-color: #0529aa;
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
    <ScrollButton show={visible} onClick={scrollToTop}>
      ↑
    </ScrollButton>
  );
};

export default ScrollToTopButton;
