import styled from "styled-components";


export const CloseBtnCont = styled.div`
  margin: 0 15px 0 auto;
  display: flex;
  align-items: center;
  align-content: center;

`

export const CloseBtn = styled.button`
  margin: 0 auto;
  height: 30px;
  width: 30px;
  backface-visibility: hidden;
  font-family: Tahoma, Geneva, sans-serif;
  font-size: 18px;
  background: ${props => props.theme.btnSecondary};
  border: none;
  border-radius: 50%;
  text-align: center;

  :hover {
    cursor: pointer;
  }
`