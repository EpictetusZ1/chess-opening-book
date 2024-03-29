import styled from 'styled-components';


export const ThemeSwitcherBtn = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 11;
  overflow-y: auto;
  
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
  z-index: 91;
  overflow-y: auto;
  display: flex;
  justify-content: flex-end;
`

export const ThemeController = styled.div`
  background: ${props => props.theme.colors.modalPrimary};
  height: 100%;
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  color: ${props => props.theme.colors.modalText};
  overflow-y: auto;
  padding-bottom: 75px;

  > h2 {
    margin: 0;
    padding-bottom: 15px;
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
  
  .saveThemeContainer {
    width: 100%;
    padding: 0 25px;
  }
`


export const PrefGroup = styled.div<{ iconBgColor: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 25px;

  > p {
    padding: 5px 0;
  }

  .prefHeader {
    width: 100%;
    padding: 5px 12px;
    display: flex;
    align-items: start;

    .iconBackground {
      height: 60px;
      width: 60px;
      min-width: 60px;
      min-height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${props => props.iconBgColor};
      border-radius: 1rem;
    }

    .prefText {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      text-align: left;
      padding: 0 0 0 25px;
    }

    .prefTitle {
      padding-bottom: 7px;
      line-height: ${props => props.theme.typography.subHeaderSize};
      font-size: ${props => props.theme.typography.subHeaderSize};
    }

    .prefDesc {
      color: ${props => props.theme.colors.accentTextColor};
      font-size: ${props => props.theme.typography.accentTextSize};
    }
  }

  .prefBody {
    display: flex;
    justify-content: center;
    border: 3px solid ${props => props.iconBgColor};
    box-shadow: inset 0 1px 4px 0 rgba(0, 0, 0, 0.35);
    border-radius: 1rem;
    padding: 25px;
    margin-top: 10px;

    input:hover, button:hover {
      cursor: pointer;
    }
  }

  .optionGroup {
    width: 33%;
    display: flex;
    flex-direction: row;
    justify-content: center;

    > label {
      padding: 0 0 0 5px;
    }
  }
`
