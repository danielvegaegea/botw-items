//import { useAppSelector } from '../app/hooks';
import { Link } from 'react-router-dom';
//import { selectCompendium } from '../features/hyruleCompendium/hyruleCompendiumSlice';
import { T_ElementPropPage } from '../types/';
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
`;
const StyledPicuture = styled('picture')`
  height: 50px;
  width: 50px;
  margin-right: 1rem;
  display: flex;
`;

const CompendiumElementEntry = (props: T_ElementPropPage) => {
  //const compendiumState = useAppSelector(selectCompendium);

  let { c_name, c_imgSrc, c_id } = props;
  //const { c_name, c_imgSrc, c_id }: T_ElementPage = compendiumState.ePage;
  let c_class = String(c_id);

  return (
    <Link to={`/compendium/${c_id}`} className={c_class}>
      <StyledSection>
        <StyledPicuture>
          <img src={c_imgSrc} alt={c_name} />
        </StyledPicuture>
        <p>{capitalizeWords(c_name)}</p>
      </StyledSection>
    </Link>
  );
};

export default CompendiumElementEntry;
