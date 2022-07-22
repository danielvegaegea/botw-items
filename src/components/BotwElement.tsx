import { Link } from 'react-router-dom';
import { TypeElementPropPage } from '../types/';
import styled from 'styled-components';
import { capitalizeWords } from '../tools/tools';

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

const CompendiumElementEntry = (props: TypeElementPropPage) => {
  let { cName, cImgSrc, cId } = props;
  let c_class = String(cId);

  return (
    <Link to={`/compendium/${cId}`} className={c_class}>
      <StyledSection>
        <StyledPicuture>
          <img src={cImgSrc} alt={cName} />
        </StyledPicuture>
        <p>{capitalizeWords(cName)}</p>
      </StyledSection>
    </Link>
  );
};

export default CompendiumElementEntry;
