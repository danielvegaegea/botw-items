// Router
import { Link } from 'react-router-dom';
// Styled Components
import styled from 'styled-components';
// Tools
import { capitalizeWords } from '../tools/tools';
// Types
import { TypeElementPropPage } from '../types/';

//
// Styled Functions
//
const StyledSection = styled('section')`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 18rem;
  margin: 0.3rem 0.5rem;

  & p {
    margin: 0;
    font-size: 105%;
    color: white;

    &:hover {
      color: yellow;
    }
  }

  @media screen and (orientation: portrait) and (max-width: 400px) {
    max-width: 85vw;
    p {
      font-size: 100%;
    }
  }
`;

const StyledPicuture = styled('picture')`
  height: 50px;
  width: 50px;
  margin-right: 1rem;
  display: flex;
`;

//
// Functions
//
const CompendiumMasterElementEntry = (props: TypeElementPropPage) => {
  // Default
  // Este componente dibuja cada linea del Vade Mecum, que aparecerá
  // en 'VadeMecumPage'.
  let { cName, cImgSrc, cId } = props;
  let c_class = String(cId);

  return (
    <Link to={`/master-compendium/${cId}`} className={c_class}>
      <StyledSection>
        <StyledPicuture>
          <img src={cImgSrc} alt={cName} />
        </StyledPicuture>
        <p>{capitalizeWords(cName)}</p>
      </StyledSection>
    </Link>
  );
};

export default CompendiumMasterElementEntry;
