import styled from "styled-components";


export const Dashboard = styled.div`
  padding: 12vh 0 5vh 0;
  width: 100%;
  height: auto;
  max-height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textPrime};

  .dashboard {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto auto 1fr ;
    gap: 0 0;
    grid-template-areas:
    ". userWelcome userWelcome . uploadGame ."
    ". playerInfo playerInfo playerInfo playerInfo ."
    ". gameInfo gameInfo gameInfo gameInfo .";
    align-content: start;
    align-items: start;
  }

  .userWelcome { grid-area: userWelcome; }

  .uploadGame { grid-area: uploadGame; }

  .gameInfo { grid-area: gameInfo; }
  
  .playerInfo { grid-area: playerInfo; }

`
