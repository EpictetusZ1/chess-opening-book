import styled from "styled-components";


export const BoardContainer = styled.div`
  height: 800px;
  width: 800px;
  margin: 10px 50px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
`

export const WhiteSquare = styled.div`
  background-color: #EFEFEF;
  display: grid;
  place-items: center;
`

export const BlackSquare = styled.div`
  background-color: #8877B7;
  display: grid;
  place-items: center;`

