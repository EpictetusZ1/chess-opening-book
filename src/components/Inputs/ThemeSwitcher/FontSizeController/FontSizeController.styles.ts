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
    text-align: left;
  }

  hr {
    width: 100%;
  }
`

export const FontSizePreview = styled.div<{
    pSize: number,
    headerSize: number,
    subHeaderSize: number,
    accentTextSize: number,
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  
  p {
    padding-right: 15px;
    margin: auto 0;
  }
  
  .header {
    font-size: ${props => props.headerSize}px;
  }
  
  .subHeader {
    font-size: ${props => props.subHeaderSize}px;
  }
  
  .p {
    font-size: ${props => props.pSize}px;
  }
  
  .accentText {
    font-size: ${props => props.accentTextSize}px;
  }
`
