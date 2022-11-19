import styled from "styled-components";


export const GamesTable = styled.table`
  width: 100%;
  
  thead,
  tbody {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
    padding: 5px 0;
    text-align: center;
  }
  
  tr {
    display: contents;
    
    :hover {
      cursor: pointer;

      > td {
        opacity: 0.9;
      }
    }
  }
  
  td {
    padding: 10px 0;
    background-color: ${props => props.theme.colors.tertiary};
    border-bottom: 1px solid ${props => props.theme.colors.primary};
  }
  
  .playerInfo {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0 0;
  }
`
