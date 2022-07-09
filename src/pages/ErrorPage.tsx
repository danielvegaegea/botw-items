import BotwHeader from '../components/BotwHeader';
import { Link } from 'react-router-dom';
//import { Helmet } from 'react-helmet';
//import styled from 'styled-components';

/* const StyledErrorPage = styled.div`
  max-width: 50%;
  border: 5px solid red;
  background-color: pink;
`; */

const ErrorPage = () => {
  return (
    <>
      {/* <Helmet>
        <title>Page not found</title>
      </Helmet> */}
      <BotwHeader />
      {/* <StyledErrorPage> */}
      <h1>Error</h1>
      <p>
        Maybe you lost your way. You should return to <Link to="/">home</Link>{' '}
        and try again.
      </p>
      {/* </StyledErrorPage> */}
    </>
  );
};

export default ErrorPage;
