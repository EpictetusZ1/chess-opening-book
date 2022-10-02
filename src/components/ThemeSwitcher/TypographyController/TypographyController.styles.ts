import styled from 'styled-components';

export const TypographyController = styled.div`
  label {
    padding-right: 10px;
  }

  > h4 {
    padding: 10px 0 0 0;
    text-align: center;
  }

  hr {
    width: 100%;
  }
`

export const fontPreview = styled.div<{ fontName: string }>`
  font-family: ${props => props.fontName};
  font-size: 1.25rem;
    
`