import styled from "styled-components";

export const NavBar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 10vh;
  width: 100%;
  background-color: ${props => props.theme.secondary};
  color: ${props => props.theme.primary};
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  .loading {
    opacity: 0;
    transition: all 0.2s ease-in;
  }
  
  .loaded {
    opacity: 1;
    transition: all 0.2s ease-in;
  }
  
  ul {
    display: flex;
    flex-direction: row;
    list-style: none;
  }
  
  li:hover {
    border-bottom: 3px solid ${props => props.theme.highlightSecondary};
  } 
  
  a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: ${props => props.theme.tertiary};
    display: block;
    transition: 0.3s;
  }

  a:hover {
    color: ${props => props.theme.highlightSecondary};
  }

  .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }


  /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
  @media screen and (max-height: 450px) { {
    padding-top: 15px;
  }
    a {
      font-size: 18px;
    }
  }

`