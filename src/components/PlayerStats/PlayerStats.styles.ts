import styled from "styled-components";

export const PlayerStats = styled.div`
  width: 100%;
  padding: 15px 20px;
  border-radius: 1rem;
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.textPrime};
  min-height: 20vh;
  box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  
  h2 {
    font-size: ${props => props.theme.typography.headerSize};
    margin: 10px 0;
  }
  
  p {
    margin: 0;
  }

  .gameCountCont {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  .accentText {
    padding-left: 10px;
    font-size: ${props => props.theme.typography.accentTextSize};
    line-height: 1.75rem;
  }
  
  .inlineStats {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .statItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .statTitle {
    font-size: ${props => props.theme.typography.pSize};
    font-weight: bold;
    padding: 10px 0;
  }
  
  .statValue {
    font-size: ${props => props.theme.typography.pSize};
  }
`
