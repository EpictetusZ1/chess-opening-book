import styled from "styled-components";


export const CloseBtnCont = styled.div`
  width: 100%;
  position: relative;
  height: 0px;
`

export const CloseBtn = styled.button`
  float: right;
  height: 30px;
  width: 30px;
  backface-visibility: hidden;
  font-family: Tahoma, Geneva, sans-serif;
  font-size: 18px;
  background: ${props => props.theme.colors.buttonClose};
  color: ${props => props.theme.colors.btnText};
  border: none;
  border-radius: 50%;
  text-align: center;

  :hover {
    cursor: pointer;
  }
`