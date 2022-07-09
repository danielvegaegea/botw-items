import botwLogo from '../assets/svg/botw-logo.svg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styles
const StyledContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Styledlogo = styled('img')`
  width: 10vw;
  height: 10vw;
`;
const StyledDiv = styled('div')`
  display: flex;
  align-items: center;
  background-color: hsla(0, 0%, 0%, 0.5);
  padding: 0 1rem;
  border-radius: 5px;
  margin-left: 1rem;
  border: 2px solid hsla(0, 0%, 100%, 0.1);
  outline: 3px solid hsla(0, 0%, 0%, 0.5);
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
    <StyledContainer>
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
