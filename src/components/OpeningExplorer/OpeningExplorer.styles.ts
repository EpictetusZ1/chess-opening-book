import styled from 'styled-components';


export const OpeningExIsland = styled.table`
  width: 70%;
  border-spacing: 0 2px;
`

export const MovesPlayed = styled.div`
  display: flex;
  width: 50%;
  justify-content: flex-start;
  
  .moveListItem {
    :hover {
      cursor: pointer; 
    }
  }
`

export const MoveList = styled.tbody`
  width: 100%;
  height: auto;
  
  tr {
    width: 100%;
    margin: auto 0;
  }

  td {
    padding: 5px 0;
    min-height: 5vh;
    align-content: center;
  }

  tr:nth-of-type(odd) {
    background-color: rgba(94, 94, 94, 0.35);
  }
   
  .moveValue {
    width: 15%;
    text-align: center;
  }
  
  .gameOutcomes {
    padding: 0;
    text-align: center;
    height: 100%;
  }
  
  .moveValue:hover {
    cursor: pointer;
  }
  
  .moveFreq {
    padding: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`

type Props = {
    width: number;
}

export const MoveBar = styled.span<Props>`
  width: ${(props) => `${props.width}%`};
  min-width: 20px;
  background-color:  ${(props) => `${(props.theme.colors.highlightPrimary)};`};
  border-radius: 1rem 0 0 1rem;
  padding-right:  ${(props) => `${(props.width) + 10}%`};
  color: #000;
  
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
  
  .moveFreqText {
    padding: 0 10px;
    text-align: left;
  }
`

type WLDProps = {
    sum: number
    white: number
    black: number
    draw: number
}

export const WLDBar = styled.span<WLDProps>`
  opacity: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: ". . .";
  text-align: center;
  align-items: center;
  align-content: center;
  padding: 0 17%;
  min-height: 25px;
  height: 100%;
  border-radius: 1rem;
  
  .whiteVal {
    border-radius: 1rem 0 0 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #FFF;
    color: #000;
    padding: 5px 10px;
  }
  
  .drawVal {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #CCC;
    color: #000;
    padding: 5px 10px;
  }

  .blackVal {
    border-radius:  0 1rem 1rem 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #000;
    color: #FFF;
    padding: 5px 10px;
  }

  :hover {
    opacity: 0.75;
    cursor: pointer;
  }

`
