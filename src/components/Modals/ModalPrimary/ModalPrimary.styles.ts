import styled from "styled-components";

export const ModalPrimaryCont = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 15;
`

export const ModalPrimary = styled.div`
  position:fixed;
  background: ${props => props.theme.colors.modalPrimary};
  color: ${props => props.theme.colors.modalText};
  width: 50%;
  height: auto;
  padding: 15px 10px;
  top: 20%;
  left: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 1.1rem;
  
  h1 {
    margin: 0.5rem;
  }
`
