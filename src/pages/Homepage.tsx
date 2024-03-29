// React Markdown
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// Helmet
import { Helmet } from 'react-helmet-async';
// Styled Components
import styled from 'styled-components';
// Assets
import botwLogo from '../assets/svg/botw-logo.svg';

//
// Styled Functions
//
const Styledlogo = styled('picture')`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  & img {
    min-height: 20rem;
  }
  @media screen and (orientation: portrait) {
    & img {
      min-height: 15rem;
    }
  }
`;

const StyledSection = styled('blockquote')`
  padding: 1rem 2rem;
  border-radius: 60px;
  max-width: 30rem;
  font-style: italic;
  & .quote-author {
    text-align: right;
  }
`;

//
// Markdown Functions
//
const markdownQuoteText = `
"I am not **Link**, but I do know him! Even after 18 years, **the
Legend of Zelda** never stops changing and this game is no
different. We are now taking you to a world where **Link** has
grown up--a world where he will act different and look different."

`;

const markdownQuoteAuthor = 'Shigeru Miyamoto';

//
// Functions
//
const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>BOTW Vade Mecum: Home</title>
      </Helmet>
      <Styledlogo>
        <img
          src={botwLogo}
          className="counter-logo"
          alt="Breath of the Wild Logo"
        />
      </Styledlogo>
      <StyledSection
        className="zelda-window"
        cite="https://nintendo.fandom.com/wiki/Shigeru_Miyamoto/quotes#:~:text=%22If%20it%20turns%20out%20that,basis%20of%20the%20new%20game.%22"
      >
        <ReactMarkdown
          children={markdownQuoteText}
          remarkPlugins={[remarkGfm]}
        />
        <ReactMarkdown
          className="quote-author"
          children={markdownQuoteAuthor}
          remarkPlugins={[remarkGfm]}
        />
      </StyledSection>
    </>
  );
};

export default Homepage;
