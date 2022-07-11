import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Helmet } from 'react-helmet';
import botwLogo from '../assets/svg/botw-logo.svg';
import styled from 'styled-components';

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
      </Helmet>{' '}
      <ReactMarkdown children={markdownText} remarkPlugins={[remarkGfm]} />
    </>
  );
};

export default About;
