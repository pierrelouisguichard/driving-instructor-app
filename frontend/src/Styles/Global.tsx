import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Global Styles */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif; /* Default font family */
    line-height: 1.6;
    color: #333; /* Default text color */
    background-color: #f4f4f4; /* Default background color */
    -webkit-font-smoothing: antialiased; /* Smooths font rendering on webkit browsers */
    -moz-osx-font-smoothing: grayscale; /* Smooths font rendering on Firefox */
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Open Sans', sans-serif; /* Font for headers */
    color: #222; /* Header color */
  }

  p {
    margin-bottom: 1rem; /* Space between paragraphs */
  }

  a {
    color: #007bff; /* Link color */
    text-decoration: none; /* Remove underline */
    &:hover {
      text-decoration: underline; /* Underline on hover */
    }
  }

`;

export default GlobalStyles;
