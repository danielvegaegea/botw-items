//import HomepageText from '../assets/markdown/HomepageText.mdx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Helmet } from 'react-helmet-async';
import botwLogo from '../assets/svg/botw-logo.svg';
import styled from 'styled-components';

const Styledlogo = styled('img')`
  width: 30vw;
  height: 30vw;
`;

const StyledSection = styled('section')`
  padding: 0.5rem;
`;

const markdownText = `
# Presentación
Esto es una página de prueba para ver si todo funciona.
Veamos un texto en **negrita** y otro en _cursiva_.

## Hello, world!
Esto es un segundo párrafo.

`;

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>BOTW Vade Mecum: Home</title>
      </Helmet>
      <Styledlogo src={botwLogo} className="counter-logo" alt="logo" />
      <StyledSection className="zelda-window">
        <ReactMarkdown children={markdownText} remarkPlugins={[remarkGfm]} />
      </StyledSection>
    </>
  );
};

export default Homepage;
