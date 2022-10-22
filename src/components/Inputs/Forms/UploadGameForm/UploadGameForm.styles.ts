import styled from 'styled-components';

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
    font-size: ${props => props.theme.typography.subHeaderSize};
    font-weight: bolder;
    letter-spacing: 0.4px;
    background-color: ${props => props.theme.colors.btnPrimary};
    border-radius: 6px;
    border-width: 0;
    box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
    box-sizing: border-box;
    color: ${props => props.theme.colors.btnText};
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
    background-color: ${props => props.theme.colors.btnSecondary};
    color: ${props => props.theme.colors.btnText};
  }
`
