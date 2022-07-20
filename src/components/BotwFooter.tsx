import styled from 'styled-components';
import botwTfLogo from '../assets/svg/triforce.svg';
import { Link } from 'react-router-dom';

const BotwFooter = () => {
  const Styledlogo = styled('img')`
    height: 1.2rem;
    margin: 0.5rem;
  `;

  const StyledContainer = styled('footer')`
    display: flex;
    align-items: center;
    font-family: 'The Wild Breath of Zelda', sans-serif;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    padding: 0.3rem 0.5rem;
  `;
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
