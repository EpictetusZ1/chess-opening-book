import styled from "styled-components";

export const PlayerStats = styled.div`
  width: 100%;
  padding: 15px 20px;
  border-radius: 1rem;
  background-color: ${props => props.theme.highlightSecondary};
  opacity: 0.9;
  color: ${props => props.theme.secondary};
  min-height: 20vh;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  
  h2 {
    font-size: 2.5rem;
    margin: 10px 0;
  }
  
  p {
    margin: 0;
  }
  
  .statTitle {
    font-size: 1.75rem;
    font-weight: bold;
    padding: 10px 0;
  }
  
  .statValue {
    font-size: 1.3rem;
  }
  
  .statItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

