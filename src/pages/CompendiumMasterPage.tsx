// Router
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
// Redux
import { useAppDispatch, useAppSelector } from '../app/hooks';
// React
import { useEffect, useState } from 'react';
// Slice
import {
  setCompendiumMasterFromData,
  setIdArray,
  selectCompendiumMaster,
} from '../features/hyruleCompendiumMaster/hyruleCompendiumMasterSlice';
// Helmet
import { Helmet } from 'react-helmet-async';
// Styled Components
import styled from 'styled-components';
// Tools
import { capitalizeWords } from '../tools/tools';
// Types
import {
  TypeCompendiumElement,
  TypeGenericElement,
  TypeBOTWCompendiumMasterResponseData,
  TypeBOTWCompendiumArray,
} from '../types';
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
const getCompendium = async () => {
  // Obtenemos el compendio desde la API.
  try {
    const response = await fetch(
      'https://botw-compendium.herokuapp.com/api/v2/master_mode/all',
    );
    const compendiumMaster =
      (await response.json()) as TypeBOTWCompendiumMasterResponseData;
    return compendiumMaster.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchCompendiumByIsoCode = async (isoCode: string) => {
  //  Obtenemos los datos a renderizar en la página usando el isoCode.
  try {
    const reponse = await fetch(
      `https://botw-compendium.herokuapp.com/api/v2/master_mode/entry/${isoCode}`,
    );
    const compendiumElement = await reponse.json();
    return compendiumElement.data;
  } catch (error) {
    return null;
  }
};

const CompendiumMasterPage = () => {
  // Default
  //  La página que se renderiza cuando el usuario hace click en un elemento.
  const [element, setElement] = useState<TypeGenericElement | null>(null);
  const dispatch = useAppDispatch();
  const { isoCode } = useParams();
  const compendiumState = useAppSelector(selectCompendiumMaster);

  const launcher = async () => {
    let masterArray: TypeBOTWCompendiumArray;
    if (isoCode) {
      masterArray = await getElement(isoCode);
      createIdArray(masterArray);
    }
  };

  const getElement = async (id: string) => {
    let elementData: TypeCompendiumElement;
    let masterArray: TypeBOTWCompendiumArray;
    let idData: TypeCompendiumElement | undefined;
    if (!compendiumState.compendiumMasterArray) {
      // Usa fetchCompendiumByIsoCode para obtener los datos y los almacena.
      masterArray = await getCompendium();
      // Ordenamos la tabla.
      masterArray?.sort(
        (x: TypeCompendiumElement, y: TypeCompendiumElement) => {
          if (x.id > y.id) {
            return 1;
          }
          if (x.id < y.id) {
            return -1;
          }
          return 0;
        },
      );
      dispatch(setCompendiumMasterFromData(masterArray));
    } else {
      masterArray = compendiumState.compendiumMasterArray;
    }
    const nId = Number(id);
    idData = masterArray?.find((x: TypeCompendiumElement) => x.id === nId);
    if (idData !== undefined) {
      elementData = idData;
    } else {
      elementData = await fetchCompendiumByIsoCode(id);
    }
    setElement(elementData);
    return masterArray;
  };

  const createIdArray = async (masterArray: TypeBOTWCompendiumArray) => {
    let idList: string[];
    idList = masterArray!.map((cElement: TypeCompendiumElement) => {
      const data = cElement.id;
      return data.toString(10);
    });
    //console.log('idlist');
    //console.log(typeof idList);
    dispatch(setIdArray(idList));
  };

  useEffect(() => {
    // Llamamos a la función getElement si tenemos isoCode.
    launcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Procesamos los datos y creamos variables o constantes.
  //    Preparando pElement
  //let pElement: TypeGenericElement;
  //pElement = element ? element : null;
  //    Common elements
  const eName = capitalizeWords(element ? element.name : '-');
  const eImage = element ? element.image : '';
  const eCategory = capitalizeWords(element ? element.category : '-');
  const eDescription = element ? element.description : '-';
  let eLocation = [];
  eLocation[1] = '(None)';
  //    Label para los Drops prop.
  let hLabel = '';
  let eLabel = [];

  // Creación de elementos a renderizar.
  //  Sección de lugares comunes.
  if (element?.common_locations) {
    for (let i = 0; i < 4; i++) {
      eLocation[i] = element?.common_locations
        ? capitalizeWords(element!.common_locations[i])
        : '-';
    }
  }

  //    Non Food, Monsters or Treasure
  if (element?.drops) {
    eLabel[0] = 'Drops:';
    if (element?.drops!.length === 0) {
      eLabel[1] = '-';
    } else {
      for (let i = 1; i < 13; i++) {
        eLabel[i] =
          element?.drops![i - 1] !== undefined
            ? capitalizeWords(element?.drops[i - 1])
            : '';
      }
    }
  }

  // Generamos una Id y la usamos para los links de siguiente y anterior, controlando
  // no pasarnos del último elemento de la api. Los números han sido hardcodeados
  // en caso de no poder acceder a array asumiendo que no habrá cambios en la API
  // a estas alturas para ahorrarnos el obtenerlos del Array. Este caso, solo se
  // produciría si el usuario intentara entrar desde un enlace a un elemento en
  // concreto.
  const nId = Number(isoCode!);
  const pageId = compendiumState.compendiumMasterArray?.findIndex(
    (x: TypeCompendiumElement) => x.id === nId,
  );

  //console.log(idList);

  let content;
  /* const lastPage: number = compendiumState?.compendiumMasterArray
    ? compendiumState?.compendiumMasterArray?.length
    : 389; */
  let idList = compendiumState.idArray;
  //console.log('array');
  //console.log(typeof compendiumState.idArray[0]);
  const lastPage: number = idList!.length - 1;
  //console.log(idList);
  //console.log('WARNING');
  console.log(idList);
  //console.log(typeof idList[0]);
  console.log(isoCode);
  //console.log(typeof isoCode);
  console.log(idList!.includes(isoCode!));
  if (idList!.includes(isoCode!)) {
    let prevId, nextId;

    if (pageId === 0) {
      prevId = idList![lastPage];
      nextId = idList![1];
    } else if (pageId === lastPage) {
      prevId = idList![lastPage - 1];
      nextId = idList![0];
    } else {
      prevId = idList![pageId! - 1];
      nextId = idList![pageId! + 1];
    }

    //if (Element) {
    // Solo se renderiza si tenemos element.
    content = (
      <>
        <Helmet>
          <title>BOTW Vade Mecum: {eName}</title>
        </Helmet>
        <StyledCompendiumPage className="zelda-window">
          <Link to={`/master-vade-mecum`}>
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
            <Link to={`/master-compendium/${prevId}`}>
              <StyledLeftArrow className="left-arrow arrow">
                <img
                  src={botwArrow}
                  className="counter-logo"
                  alt="Breath of the Wild Logo"
                />
              </StyledLeftArrow>
            </Link>
            <h2>
              {pageId! + 1}: {eName}
            </h2>
            <Link to={`/master-compendium/${nextId}`}>
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
  /* } else {
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
  } */
};
export default CompendiumMasterPage;
