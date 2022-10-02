import styled from "styled-components";

export const FontSizeController = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  label {
    padding-right: 10px;
  }
  
  > h4 {
    padding: 10px 0 0 0;
  }

  hr {
    width: 100%;
  }
`

export const FontSizePreview = styled.div<{
    pSize: string,
    headerSize: string,
    subHeaderSize: string,
    accentTextSize: string,
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  p {
    padding-right: 15px;
    margin: 0;
  }
  
  .header {
    font-size: ${props => props.headerSize};
  }
  
  .subHeader {
    font-size: ${props => props.subHeaderSize};
  }
  
  .p {
    font-size: ${props => props.pSize};
  }
  
  .accentText {
    font-size: ${props => props.accentTextSize};
  }
`
