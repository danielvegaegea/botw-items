import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

const StyledContainer = styled('div')`
  margin: 1rem 0 0 0;
  width: 50vw;
  min-width: 33rem;
  font-size: 100%;
  padding: 1rem;
`;

const markdownText = `
# About this page:

## Presentation

This project is part of my personal portfolio, part a work, part a hobby to me. This
project was made as part of my [General Assembly](https://generalassemb.ly/)
formation. May this page be a good companion and help you in your adventures with
**Link** in **Breath Of The Wild**.

## Disclaimer

The **Legend of Zelda** franchise, the assets, images and designs are properties by 
heir legitimate owners. This page is for _non profit objectives_.

## Vade Mecum

The **Vade Mecum** content belongs to
[Hyrule Compendium API](https://gadhagod.github.io/Hyrule-Compendium-API/#/)
and it's to their creators the merit belongs. I only used it to render the content
in a more comfortable way.

## About the project

The project was created in [React](https://es.reactjs.org/) with
[Create React App](https://create-react-app.dev/) in
[TypeScript](https://www.typescriptlang.org/es/), using
[React Redux Toolkit](https://redux-toolkit.js.org/),
[React Router](https://v5.reactrouter.com/),
[React Markdown](https://www.npmjs.com/package/react-markdown),
[React Helmet Asyng](https://www.npmjs.com/package/react-helmet-async)
and [Styled Components](https://styled-components.com/). As working framework,
I used [Visual Studio Code](https://code.visualstudio.com/).

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
