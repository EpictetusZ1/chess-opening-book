import styled from 'styled-components';


export const ThemeSwitcherBtn = styled.div`
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


export const ThemeControllerContainer = styled.div`
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  z-index: 9;
  display: flex;
  justify-content: flex-end;
`

export const ThemeController = styled.div`
  background: ${props => props.theme.modalPrimary};
  height: 100vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  color: ${props => props.theme.modalText};

  > h2 {
    margin: 0;
    padding-bottom: 25px;
  }
  
  .btnContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    
    .closeThemeSwitcher {
      width: 60px;
      height: 60px;
      background: none;
      border: none;

      :hover {
        cursor: pointer;
      }
    }
  }
`


export const PrefGroup = styled.div`
  width: 100%;




`
