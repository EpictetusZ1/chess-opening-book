import styled from 'styled-components';


export const OpeningExIsland = styled.table`
  width: 25%;
  border-spacing: 0 2px;
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
  }
  
  tr:nth-of-type(odd) {
    background-color: rgba(94, 94, 94, 0.35);
  }
   
  .moveValue {
    width: 30%;
    text-align: center;
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
  background-color: #000;
  opacity: 1;
  border-radius: 1rem 0 0 1rem;
  padding-right:  ${(props) => `${(props.width) + 10}%`};
  
  .moveFreqText {
    padding: 0 10px;
    text-align: left;
  }
`
