import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Global Styles */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Roboto', sans-serif; 
    line-height: 1.6;
    color: #333; 
    background-color: #f4f4f4; 
    -webkit-font-smoothing: antialiased; 
    -moz-osx-font-smoothing: grayscale; 
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Open Sans', sans-serif; 
    color: #222;
  }

  p {
    margin-bottom: 1rem; 
  }

  a {
    color: #007bff; 
    text-decoration: none; 
    &:hover {
      text-decoration: underline; 
    }
  }

`;

export default GlobalStyles;
