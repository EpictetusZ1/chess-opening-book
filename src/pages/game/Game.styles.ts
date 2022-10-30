import styled from "styled-components";

export const Game = styled.div`
  background-color: ${props => props.theme.colors.primary};
  height: 100%;
  min-height: 150vh;
  min-width: 100vw;
  padding: 12vh 0 5vh 0;
  color: ${props => props.theme.colors.textPrime};
  display: flex;
  justify-content: center;

  h2 {
    margin: 25px 0;
    color: ${props => props.theme.colors.btnText};
  }
  
  .pageHeader {
    width: 60%;
    height: 12vh;
    
    > hr {
      width: 100%;
    }
  }

  .playerData {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    > span {
      width: fit-content;
      display: inline-flex;
      flex-direction: row;
      justify-content: space-evenly;
      
      > b {
        margin-right: 5px;
      }
      
      .playerElo {
        margin-left: 5px;
      }
    }
  }
  
  .statContainer {
    margin-top: 55px;
    width: 100%;

    hr {
      color: ${props => props.theme.colors.textPrime};
      margin: 25px 0;
    }

    .statsDisplay {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;

      .stat {
        margin-right: 50px;
        
        p {
          margin: 15px 0;
        }
      }
    }
  }
  
  
 .moveListCont {
   width: 100%;
   height: auto; 
   
   .moveList {
     width: 100%;
     height: auto;
     display: inline-flex;
     flex-direction: row;
     flex-wrap: wrap;


     .ply {
       display: flex;
       justify-content: flex-start;
       min-width: 10%;
       height: 35px;
       margin-left: 10px; 
     }
   }
 } 

`