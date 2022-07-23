// Router
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
// Redux
import { useEffect, useState } from 'react';
// Helmet
import { Helmet } from 'react-helmet-async';
// Styled Components
import styled from 'styled-components';
// Tools
import { capitalizeWords } from '../tools/tools';
// Types
import { TypeCompendiumElement, TypeGenericElement } from '../types';
// SVG
import botwArrow from '../assets/svg/botw-arrow.svg';

//
// Styled components Functions
//
const StyledCompendiumPage = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 30rem;
  max-width: 80vw;
  margin-left: 0rem;

  .arrow:hover {
    filter: invert(75%);
  }

  & h3 {
    color: yellow;
  }
  & .title {
    display: flex;
    justify-content: center;
  }
  & article {
    display: flex;
    justify-content: space-evenly;
  }

  & picture {
    padding: 0.3rem;
    width: 15vw;
    min-width: 150px;
    max-width: 150px;
    margin-right: 1rem;
  }

  & .element-info {
    max-width: 30rem;
    padding: 0.5rem;
  }

  @media screen and (orientation: portrait) {
    /* font-size: 120%; */
    min-width: 20rem;
    max-width: 80vw;
    align-items: center;
    & .title {
      color: blue;
    }
    & article {
      flex-direction: column;
      justify-content: unset;
    }

    & picture {
      padding: 0.3rem;
      width: 30vw;
      min-width: 200px;
      max-width: 200px;
      margin-right: 0;
      margin-bottom: 1rem;
    }
    .picture-container {
      display: flex;
      justify-content: center;
    }
    /* & .element-info {
      max-width: 30rem;
      padding: 0.5rem;
    } */
  }
`;

const StyledCompendiumTittle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 8rem;
  @media screen and (orientation: portrait) and (max-width: 540px) {
    font-size: 90%;
  }
`;

const StyledUpArrow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  /* height: 2rem; */
  img {
    max-width: 5rem;
    max-height: 5rem;
    transform: rotate(180deg) scale(1, 0.5);
  }
`;
const StyledLeftArrow = styled.div`
  max-width: 5rem;
  transform: rotate(90deg) scale(1, 0.5);
`;
const StyledRightArrow = styled.div`
  max-width: 5rem;
  transform: rotate(-90deg) scale(1, 0.5);
`;

const StyledErrorPage = styled.div`
  margin: 5rem 0 0 0;
  max-width: 25rem;
`;

const fetchCompendiumByIsoCode = async (isoCode: string) => {
  //  Gets the page data using the isoCode of the page.
  try {
    const reponse = await fetch(
      `https://botw-compendium.herokuapp.com/api/v2/entry/${isoCode}`,
    );
    const compendiumElement = await reponse.json();
    return compendiumElement.data;
  } catch (error) {
    console.error(error);
  }
};

const CompendiumPage = () => {
  //  The page itself.
  const [element, setElement] = useState<TypeCompendiumElement | null>(null);
  const { isoCode } = useParams();

  const getElement = async (id: string) => {
    const elementData: TypeCompendiumElement = await fetchCompendiumByIsoCode(
      id,
    );
    setElement(elementData);
  };

  useEffect(() => {
    if (isoCode) {
      getElement(isoCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isoCode]);

  // Processing the data and creating variables and constants.
  //    Preparing pElement
  let pElement: TypeGenericElement;
  pElement = element ? element : null;
  //    Common elements
  const eName = capitalizeWords(pElement ? pElement.name : '-');
  const eId = pElement ? pElement.id : '-';
  const eImage = pElement ? pElement.image : '';
  const eCategory = capitalizeWords(pElement ? pElement.category : '-');
  const eDescription = pElement ? pElement.description : '-';
  let eLocation = [];
  eLocation[1] = '(None)';
  //    Label for the Drops prop.
  let hLabel = '';
  let eLabel = [];

  // Contitions of elements to render.
  //  Common Locations section
  if (pElement?.common_locations) {
    for (let i = 0; i < 4; i++) {
      eLocation[i] = pElement?.common_locations
        ? capitalizeWords(pElement!.common_locations[i])
        : '-';
    }
  }

  //    Food or Materials
  if (pElement?.cooking_effect) {
    eLabel[0] = 'Cooking Effect:';
    eLabel[1] = capitalizeWords(pElement.cooking_effect);
    hLabel = 'Hearts Recovered:';
    eLabel[3] = pElement.hearts_recovered;
  } else {
    //    Equipment
    if (pElement?.category === 'equipment') {
      eLabel[0] = 'Attack:';
      eLabel[1] = pElement.attack ? pElement.attack : '-';
      hLabel = 'Defense:';
      eLabel[3] = pElement.defense ? pElement.defense : '-';
    } else {
      //    Non Food, Monsters or Treasure
      if (pElement?.drops) {
        eLabel[0] = 'Drops:';
        if (pElement?.drops!.length === 0) {
          eLabel[1] = '-';
        } else {
          for (let i = 1; i < 13; i++) {
            eLabel[i] =
              pElement?.drops![i - 1] !== undefined
                ? capitalizeWords(pElement?.drops[i - 1])
                : '';
          }
        }
      }
    }
  }

  const pageId = Number(isoCode!);
  let content;

  if (pageId > 0 && pageId < 390) {
    let prevId, nextId;

    if (pageId === 1) {
      prevId = 389;
      nextId = 2;
    } else if (pageId === 389) {
      prevId = 388;
      nextId = 1;
    } else {
      prevId = pageId - 1;
      nextId = pageId + 1;
    }

    if (element) {
      content = (
        <>
          <Helmet>
            <title>BOTW Vade Mecum: {eName}</title>
          </Helmet>
          <StyledCompendiumPage className="zelda-window">
            <Link to={`/vade-mecum`}>
              <StyledUpArrow className="left-arrow arrow">
                <div>
                  <img
                    src={botwArrow}
                    className="counter-logo"
                    alt="Breath of the Wild Logo"
                  />
                </div>
              </StyledUpArrow>
            </Link>
            <StyledCompendiumTittle>
              <Link to={`/compendium/${prevId}`}>
                <StyledLeftArrow className="left-arrow arrow">
                  <img
                    src={botwArrow}
                    className="counter-logo"
                    alt="Breath of the Wild Logo"
                  />
                </StyledLeftArrow>
              </Link>
              <h2>
                {eId}: {eName}
              </h2>
              <Link to={`/compendium/${nextId}`}>
                <StyledRightArrow className="left-arrow arrow">
                  <img
                    src={botwArrow}
                    className="counter-logo"
                    alt="Breath of the Wild Logo"
                  />
                </StyledRightArrow>
              </Link>
            </StyledCompendiumTittle>
            <article>
              <div className="picture-container">
                <picture className="zelda-window">
                  <img src={eImage} alt={eName} />
                </picture>
              </div>
              <section className="element-info zelda-window">
                <div>
                  <h3>Category:</h3>
                  <p>{eCategory}</p>
                </div>
                <div>
                  <h3>Description:</h3>
                  <p>{eDescription}</p>
                </div>
                <div>
                  <h3>Common Location:</h3>
                  <p>{eLocation[0]}</p>
                  <p>{eLocation[1]}</p>
                  <p>{eLocation[2]}</p>
                </div>
                <h3>{eLabel[0]}</h3>
                <p>{eLabel[1]}</p>
                {hLabel.length > 0 && <h3>{hLabel}</h3>}
                <p>{eLabel[2]}</p>
                <p>{eLabel[3]}</p>
                <p>{eLabel[4]}</p>
                <p>{eLabel[5]}</p>
                <p>{eLabel[6]}</p>
                <p>{eLabel[7]}</p>
                <p>{eLabel[8]}</p>
                <p>{eLabel[9]}</p>
                <p>{eLabel[10]}</p>
                <p>{eLabel[11]}</p>
                <p>{eLabel[12]}</p>
              </section>
            </article>
          </StyledCompendiumPage>
        </>
      );
    } else {
      content = (
        <>
          <Helmet>
            <title>BOTW Vade Mecum: {eName}</title>
          </Helmet>
          <h2 className="zelda-window">Hey, Listen!: Loading...</h2>
        </>
      );
    }
    return content;
  } else {
    return (
      <>
        <Helmet>
          <title>BOTW Vade Mecum: Page not found</title>
        </Helmet>
        <StyledErrorPage className="zelda-window">
          <h1>⚠️ Error!</h1>
          <p>
            Maybe you lost your way. You should return to{' '}
            <Link to="/">home</Link> and try again.
          </p>
        </StyledErrorPage>
      </>
    );
  }
};
export default CompendiumPage;
