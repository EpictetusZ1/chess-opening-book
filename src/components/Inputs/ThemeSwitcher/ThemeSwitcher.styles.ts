import styled from 'styled-components';

export const ThemeSwitcher = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 11;
  font-size: 1.5rem;
  
  .a11yBtnContainer {
    padding: 1em;
  }
`

export const OpenBtn = styled.button`
  border-radius: 50%;
  padding: 15%;
  width: 90px;
  height: 90px;
  background-color: #3477db;
  border: 2px solid white;
  
  :hover {
    cursor: pointer;
  }
`

export const ThemeController = styled.div`
  background: ${props => props.theme.btnPrimary};
  height: 100vh;
  width: 50vw;
  padding: 10vh 15px 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  .btnContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  
  .closeThemeSwitcher {
    width: 30px;
    height: 30px;
    
    :hover {
        cursor: pointer;
    }
  }
`
