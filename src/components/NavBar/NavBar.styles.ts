import styled from "styled-components";

export const NavBar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 8vh;
  width: 100%;
  background-color: ${props => props.theme.secondary};
  color: ${props => props.theme.primary};
  z-index: 10;
  display: flex;
  flex-direction: row;
  list-style: none;
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

  .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }

  .menuItem {
    //  add bottom highlight on hover later
  }

`

export const NavBtn = styled.button`
  position: center;
  border: none;
  background-color: transparent;
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: ${props => props.theme.tertiary};
  transition: 0.3s;

  :hover {
    color: ${props => props.theme.highlightSecondary};
    font-size: 26px;
    transition: all 0.2s ease-in;
    cursor: pointer;
  }
`
