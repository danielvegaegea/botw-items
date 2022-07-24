// Router
import { Link } from 'react-router-dom';
// Helmet
import { Helmet } from 'react-helmet-async';
// Styled Components
import styled from 'styled-components';

//
// Styled Functions
//
const StyledErrorPage = styled.div`
  margin: 5rem 0 0 0;
  max-width: 25rem;
  padding: 1rem;
`;

//
// Functions
//
const ErrorPage = () => {
  // Default
  return (
    <>
      <Helmet>
        <title>BOTW Vade Mecum: Page not found</title>
      </Helmet>
      <StyledErrorPage className="zelda-window">
        <h1>⚠️ Error!</h1>
        <p>
          Maybe you lost your way. You should return to <Link to="/">home</Link>{' '}
          and try again.
        </p>
      </StyledErrorPage>
    </>
  );
};

export default ErrorPage;
