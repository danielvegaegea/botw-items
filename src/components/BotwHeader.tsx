//import botwLogo from '../assets/svg/botw-logo.svg';
import botwLogo from '../assets/svg/botw-icon.svg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styles
const StyledContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  margin: 0 0 1rem 0;
`;
const Styledlogo = styled('img')`
  width: 4vw;
  height: 4vw;
`;
const StyledDiv = styled('div')`
  display: flex;
  align-items: center;
`;
const StyledTitle = styled('h2')`
  margin-left: 1rem;
  font-size: 1rem;
  margin: 0;
`;
const StyledUl = styled('ul')`
  display: flex;
  list-style-type: none;
  margin-left: 0.5rem;
  padding: 0 0 0 0.5rem;
`;
const StyledLi = styled('li')`
  margin-right: 1rem;
  &:last-of-type {
    margin-right: 0;
  }
  &:hover {
    color: yellow;
  }
`;
const StyledLink = styled(Link)`
  color: unset;
  text-decoration: none;
`;

const BotwHeader = () => {
  return (
    <StyledContainer className="zelda-window">
      <Styledlogo src={botwLogo} className="counter-logo" alt="logo" />
      <StyledDiv>
        <StyledTitle>LOZ:BOTW's Vade Mecum</StyledTitle>
        <nav>
          <StyledUl>
            <StyledLi>
              <StyledLink to="/">Home</StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/vade-mecum">Vade Mecum</StyledLink>
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
