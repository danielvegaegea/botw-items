// Router
import { Link } from 'react-router-dom';
// Styled Components
import styled from 'styled-components';
// Assets
import botwLogo from '../assets/svg/botw-icon.svg';

//
// Styles Functions
//
const StyledContainer = styled('div')`
  font-family: 'The Wild Breath of Zelda', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  margin: 0 0 1rem 0;
`;

const Styledlogo = styled('img')`
  height: 7rem;
  margin: 0.5rem;
`;

const StyledDiv = styled('div')`
  display: flex;
  padding-top: 0.5rem;
  flex-direction: column;
  align-items: center;
`;

const StyledTitle = styled('h2')`
  margin: 0;
  width: 20rem;
  text-align: center;
  font-size: 140%;
  @media screen and (orientation: portrait) and (max-width: 440px) {
    font-size: 120%;
    width: 13rem;
  }
`;

const StyledUl = styled('ul')`
  display: flex;
  list-style-type: none;
  margin: 0.5rem 0 0 0.5rem;
  padding: 0 0 0 0.5rem;
  @media screen and (orientation: portrait) and (max-width: 440px) {
    flex-direction: column;
  }
`;

const StyledLi = styled('li')`
  margin-right: 1rem;
  a:link,
  a:visited {
    color: white;
  }
  &:last-of-type {
    margin-right: 0;
  }
  a:hover {
    color: yellow;
  }
`;

const StyledLink = styled(Link)`
  color: unset;
  text-decoration: none;
`;

//
// Functions
//
const BotwHeader = () => {
  // Default
  // Cabecera con un menu nav.
  return (
    <StyledContainer className="zelda-window">
      <Link to="/">
        <Styledlogo src={botwLogo} alt="Zelda Logo" />
      </Link>
      <StyledDiv>
        <StyledTitle>LOZ: Breath Of The Wild's Vade Mecum</StyledTitle>
        <nav>
          <StyledUl>
            <StyledLi>
              <StyledLink to="/">Home</StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/vade-mecum">Vade Mecum</StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/master-vade-mecum">Master Vade Mecum</StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/about">About</StyledLink>
            </StyledLi>
          </StyledUl>
        </nav>
      </StyledDiv>
    </StyledContainer>
  );
};

export default BotwHeader;
