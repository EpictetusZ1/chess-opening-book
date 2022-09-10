import styled from 'styled-components';

export const OpeningExplorerContainer = styled.div`
  padding: 12vh 0 5vh 0;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.highlightSecondary};
  color: ${props => props.theme.secondary};
`

export const VariationContainer = styled.div`
    display: flex;
    flex-direction: column;
  
  .variationItem {
    display: inline-flex;
  }
`