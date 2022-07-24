// Styled Components
import styled from 'styled-components';
// Router
import { Link } from 'react-router-dom';
// Assets
import botwTfLogo from '../assets/svg/triforce.svg';

//
// Styled Functions
//
const Styledlogo = styled('img')`
  height: 1.2rem;
  margin: 0.5rem;
`;

const StyledContainer = styled('footer')`
  display: flex;
  align-items: center;
  font-family: 'The Wild Breath of Zelda', sans-serif;
  margin: 1rem 0 1rem 0;
  padding: 0.3rem 0.5rem;
`;

//
// Functions
//
const BotwFooter = () => {
  // Default
  return (
    <>
      <StyledContainer className="zelda-window">
        <Link to="/counter-page">
          <Styledlogo src={botwTfLogo} alt="Triforce Logo" />
        </Link>
        <p>Coded with ❤️ by Daniel Vega Egea</p>
      </StyledContainer>
    </>
  );
};

export default BotwFooter;
