import styled from 'styled-components';

export const UploadGameFormCont = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);

  h1 {
    margin: 0.5rem;
  }

  .modal-main {
    position:fixed;
    background: ${props => props.theme.modalPrimary};
    color: ${props => props.theme.tertiary};
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
  }
`

export const UploadGameForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input[type="file"] {
    width: 100%;
    padding: 15px 0;
  }

  // TODO: Extract these into components later, and don't forget to build an invisible button, an invisible context button, and an invisible close button.
  input[type="file"]::-webkit-file-upload-button,
  button {
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

  input[type="file"]::-webkit-file-upload-button {
    background-color: ${props => props.theme.highlightSecondary};
    color: ${props => props.theme.secondary};
  }
`
