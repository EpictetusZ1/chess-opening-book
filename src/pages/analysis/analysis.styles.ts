import styled from 'styled-components';

export const AnalysisCont = styled.div`
  padding: 12vh 0 5vh 0;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.secondary};
`