import styled from "styled-components";


export const Dashboard = styled.div`
   padding: 8vh 2rem 0 2rem;
   width: 100%;
   min-height: 100vh;
   background-color: ${props => props.theme.primary};
   color: ${props => props.theme.secondary};

   .dashboard {
      padding: 2rem;
      display: grid;
      grid-template-columns: 1fr 1.1fr 0.9fr;
      grid-template-rows: 0.5fr 0.5fr 1.7fr;
      gap: 2px 1px;
      grid-auto-flow: row;
      grid-template-areas:
      "userWelcome userWelcome uploadGame"
      ". . ."
      ". . .";
   }

   .userWelcome { grid-area: userWelcome; }

   .uploadGame { grid-area: uploadGame; }

   .uploadGameBtn {
      backface-visibility: hidden;
      font-family: Tahoma, Geneva, sans-serif;
      font-size: 18px;
      font-weight: bolder;
      letter-spacing: 0.4px;
      background-color: ${props => props.theme.highlightPrimary};
      border-radius: 6px;
      border-width: 0;
      box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
      box-sizing: border-box;
      color: ${props => props.theme.tertiary};
      cursor: pointer;
      height: 44px;
      line-height: 1.15;
      margin: 12px 0 0;
      outline: none;
      overflow: hidden;
      padding: 0 25px;
      position: relative;
      text-align: center;
      text-transform: none;
      transform: translateZ(0);
      transition: all .2s,box-shadow .08s ease-in;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      width: 100%;
   }

   .button-9:disabled {
      cursor: default;
   }

   .button-9:focus {
      box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .2) 0 6px 15px 0, rgba(0, 0, 0, .1) 0 2px 2px 0, rgba(50, 151, 211, .3) 0 0 0 4px;
   }

`