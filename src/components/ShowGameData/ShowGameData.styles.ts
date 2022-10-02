import styled from "styled-components";


export const MainContainer = styled.div`
  width: 35vw;
  height: 80vh;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 0.5rem;
  margin: 10px;
  padding: 5px;
`

export const MenuTabCont = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: space-around;
  

  button {
    width: 50%;
    padding: 15px 0;
    margin: 0;
    text-align: center;
    border: none;
    background: none;
    font: inherit;
    font-weight: bold;
    color: ${props => props.theme.colors.tertiary};
  }
  
  button:hover {
    cursor: pointer;
  }

  button:active {
    border-bottom: 5px solid #F2f2f2;
  }
`

export const MovesList = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.11);

  .singleMoveCont {
    width: 100%;

    :nth-of-type(odd) {
      background: rgba(147, 147, 147, 0.68);
    }
  }

  .singleMove {
    padding: 4px 4px 4px 20px;
    width: 50%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 2fr;

    .moveIndex {
      color: #494747;
      font-family: Verdana, sans-serif;
      float: left;
    }

    .ply {
      color: ${props => props.theme.colors.tertiary};
      font-weight: bold;
      font-size: 0.9rem;
      text-align: left;
    }
  }

`

export const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
`