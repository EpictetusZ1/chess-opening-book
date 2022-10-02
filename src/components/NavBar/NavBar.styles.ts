import styled from "styled-components";

export const NavBar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 8vh;
  width: 100%;
  background-color: ${props => props.theme.colors.secondary};
  z-index: 10;
  display: flex;
  flex-direction: row;
  list-style: none;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  
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
  font-family: inherit;
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: ${props => props.theme.typography.headerSize};
  color: ${props => props.theme.colors.textPrime};
  transition: 0.3s;

  :hover {
    cursor: pointer;
  }
`
