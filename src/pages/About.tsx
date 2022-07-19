import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

const StyledContainer = styled('div')`
  padding: 0.5rem;
`;

const markdownText = `
# Presentación

Esta es la sección **about** y aquí va su _texto_.

## Hello, world!
Esto es un segundo párrafo.
## Hello, world!
Esto es un segundo párrafo.
## Hello, world!
Esto es un segundo párrafo.
## Hello, world!
Esto es un segundo párrafo.
## Hello, world!
Esto es un segundo párrafo.
## Hello, world!
Esto es un segundo párrafo.
## Hello, world!
Esto es un segundo párrafo.
## Hello, world!
Esto es un segundo párrafo.

`;

const About = () => {
  return (
    <>
      <Helmet>
        <title>BOTW Vade Mecum: About</title>
      </Helmet>
      <StyledContainer className="zelda-window">
        <ReactMarkdown children={markdownText} remarkPlugins={[remarkGfm]} />
      </StyledContainer>
    </>
  );
};

export default About;
