import styled from "styled-components";


export const Dashboard = styled.div`
  padding-top: 12vh;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.secondary};

  .dashboard {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto auto 1fr 1fr 1fr;
    gap: 0 0;
    grid-template-areas:
    ". userWelcome userWelcome . uploadGame ."
    ". playerInfo playerInfo playerInfo playerInfo ."
    ". gameInfo gameInfo gameInfo gameInfo ."
    ". gameInfo gameInfo gameInfo gameInfo .";
    align-content: start;
    align-items: start;
  }

  .userWelcome { grid-area: userWelcome; }

  .uploadGame { grid-area: uploadGame; }

  .gameInfo { grid-area: gameInfo; }
  
  .playerInfo { grid-area: playerInfo; }

`
