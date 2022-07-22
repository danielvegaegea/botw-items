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
  @media screen and (orientation: portrait) and (max-width: 545px) {
    min-width: 20rem;
    width: 50vw;
  }
`;

const markdownText = `
# About this page

## Presentation

This project is part of my personal portfolio, part a work, part a hobby to me. This
project was made as part of my [General Assembly](https://generalassemb.ly/)
formation. May this page be a good companion and help you in your adventures with
**Link** in **Breath Of The Wild**.

## Disclaimer

The **Legend of Zelda** franchise, the assets, images and designs are properties by 
their legitimate owners. This page is for _non profit objectives_.

## Vade Mecum

The **Vade Mecum** content belongs to
[Hyrule Compendium API](https://gadhagod.github.io/Hyrule-Compendium-API/#/)
and it's to their creators the merit belongs. I only used it to render the content
in a more comfortable way.

## Assets

- Breath of the Wild logo and icon comes from
[Logopedia](https://logos.fandom.com/wiki/The_Legend_of_Zelda:_Breath_of_the_Wild).

- The Wild Breath of Zelda font comes from
[dafont.com](https://www.dafont.com/the-wild-breath-of-zelda.font)

- Background from
[Wallpaper Coders](https://wall.alphacoders.com/by_sub_category.php?id=242233&name=The+Legend+of+Zelda%3A+Breath+of+the+Wild+Fondos+de+pantalla&filter=4K+Ultra+HD&lang=Spanish).

- The Triforce symbol comes from
[SVG Repo](https://www.svgrepo.com/svg/323529/triforce).

## About the project

The project was created in [React](https://es.reactjs.org/) with
[Create React App](https://create-react-app.dev/) in
[TypeScript](https://www.typescriptlang.org/es/), using
[React Redux Toolkit](https://redux-toolkit.js.org/),
[React Router](https://v5.reactrouter.com/),
[React Markdown](https://www.npmjs.com/package/react-markdown),
[React Helmet Async](https://www.npmjs.com/package/react-helmet-async),
[React Snap](https://www.npmjs.com/package/react-snap) and
[Styled Components](https://styled-components.com/).
As working framework,
I used [Visual Studio Code](https://code.visualstudio.com/).

## Source and deploy

The source code can be consulted in [GitHub](https://github.com)
and can be found
[here](https://github.com/danielvegaegea/botw-items).
The web is deployed in [netlify](https://www.netlify.com/)
and can be visited [here](https://tloz-botw-compendium.netlify.app/).

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
