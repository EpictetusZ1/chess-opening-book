import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: ${props => props.theme.fontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    vertical-align: baseline;
    overflow-x: hidden;
    overflow-y: auto;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  
  p, a, span, div {
    font-size: ${props => props.theme.typography.pSize};
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }
  
  @font-face {
    font-family: "Open Dyslexic";
    src: url("/fonts/OpenDyslexic-Regular.otf");
    font-weight: 300;
    font-style: normal;
  }

  .container {
    padding: 0 2rem;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.textPrime};
  }

  .main {
    min-height: 100vh;
    padding: 4rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
     > h1 {
       color: ${props => props.theme.colors.tertiary};
     }
  }

  .footer {
    display: flex;
    flex: 1;
    padding: 2rem 0;
    border-top: 1px solid ${props => props.theme.colors.textPrime};
    justify-content: center;
    align-items: center;
  }

  .footer a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }

  .title a:hover,
  .title a:focus,
  .title a:active {
    text-decoration: underline;
  }

  .title {
    margin: 0;
    line-height: 1.15;
    font-size: 4rem;
  }

  .title,
  .description {
    text-align: center;
  }

  .description {
    margin: 4rem 0;
    line-height: 1.5;
    font-size: ${props => props.theme.typography.subHeaderSize};
  }

  .grid {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 800px;
  }

  .card {
    margin: 1rem;
    padding: 1.5rem;
    text-align: left;
    color: inherit;
    text-decoration: none;
    border: 1px solid ${props => props.theme.colors.textPrime};
    border-radius: 10px;
    transition: color 0.15s ease, border-color 0.15s ease;
    max-width: 300px;
  }

  .card:hover,
  .card:focus,
  .card:active {
    color: ${props => props.theme.colors.highlightPrimary};
    border-color:  ${props => props.theme.colors.highlightPrimary};
    cursor: pointer;
  }

  .card h2 {
    margin: 0 0 1rem 0;
    font-size: ${props => props.theme.typography.subHeaderSize};
  }

  .card p {
    margin: 0;
    font-size: ${props => props.theme.typography.pSize};
    line-height: 1.5;
  }

  @media (max-width: 600px) {
    .grid {
      width: 100%;
      flex-direction: column;
    }
  }

`