import styled from 'styled-components';

const BotwFooter = () => {
  const StyledContainer = styled('footer')`
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    padding: 0.3rem 0.5rem;
  `;
  return (
    <>
      <StyledContainer className="zelda-window">
        <p>Coded by Daniel Vega Egea</p>
      </StyledContainer>
    </>
  );
};

export default BotwFooter;
