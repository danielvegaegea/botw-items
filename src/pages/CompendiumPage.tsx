// Router
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
// Redux
import { useAppSelector } from '../app/hooks';
// React
import { useEffect, useState } from 'react';
// Slice
import { selectCompendium } from '../features/hyruleCompendium/hyruleCompendiumSlice';
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
    min-width: 20rem;
    max-width: 80vw;
    align-items: center;
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

//
// Functions
//
const fetchCompendiumByIsoCode = async (isoCode: string) => {
  //  Obtenemos los datos a renderizar en la página usando el isoCode.
  try {
    const reponse = await fetch(
      `https://botw-compendium.herokuapp.com/api/v2/entry/${isoCode}`,
    );
    const compendiumElement = await reponse.json();
    return compendiumElement.data;
  } catch (error) {
    return null;
  }
};

const CompendiumPage = () => {
  // Default
  //  La página que se renderiza cuando el usuario hace click en un elemento.
  const [element, setElement] = useState<TypeCompendiumElement | null>(null);
  const { isoCode } = useParams();
  const compendiumState = useAppSelector(selectCompendium);

  const getElement = async (id: string) => {
    let elementData: TypeCompendiumElement;
    let idData: TypeCompendiumElement | undefined;
    if (!compendiumState.compendiumArray) {
      // Usa fetchCompendiumByIsoCode para obtener los datos y los almacena.
      elementData = await fetchCompendiumByIsoCode(id);
    } else {
      const nId = Number(id);
      idData = compendiumState.compendiumArray.find(
        (x: TypeCompendiumElement) => x.id === nId,
      );
      if (idData !== undefined) {
        elementData = idData;
      } else {
        elementData = await fetchCompendiumByIsoCode(id);
      }
    }
    setElement(elementData);
  };

  useEffect(() => {
    // Llamamos a la función getElement si tenemos isoCode.
    if (isoCode) {
      getElement(isoCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isoCode]);

  // Procesamos los datos y creamos variables o constantes.
  //    Preparando pElement
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
  //    Label para los Drops prop.
  let hLabel = '';
  let eLabel = [];

  // Creación de elementos a renderizar.
  //  Sección de lugares comunes.
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

  // Generamos una Id y la usamos para los links de siguiente y anterior, controlando
  // no pasarnos del último elemento de la api. Los números han sido hardcodeados
  // en caso de no poder acceder a array asumiendo que no habrá cambios en la API
  // a estas alturas para ahorrarnos el obtenerlos del Array. Este caso, solo se
  // produciría si el usuario intentara entrar desde un enlace a un elemento en
  // concreto.
  const pageId = Number(isoCode!);
  let content;
  const lastPage: number = compendiumState?.compendiumArray
    ? compendiumState?.compendiumArray?.length
    : 389;

  if (pageId > 0 && pageId < lastPage + 1) {
    let prevId, nextId;

    if (pageId === 1) {
      prevId = lastPage;
      nextId = 2;
    } else if (pageId === lastPage) {
      prevId = lastPage - 1;
      nextId = 1;
    } else {
      prevId = pageId - 1;
      nextId = pageId + 1;
    }

    if (element) {
      // Solo se renderiza si tenemos element.
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
      // Mientras no esté, mostramos un mensaje de carga.
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
    // Mensaje de error en caso de que introduzcamos una id como isoCode que no
    // aparezca en la lista.
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
