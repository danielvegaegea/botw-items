import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { T_CompendiumElement, T_Food } from '../types';

const fetchCompendiumByIsoCode = async (isoCode: string) => {
  try {
    const reponse = await fetch(
      `https://botw-compendium.herokuapp.com/api/v2/entry/${isoCode}`,
    );
    const compendiumElement = await reponse.json();
    console.log('compendiumElement');
    console.log(compendiumElement);
    return compendiumElement.data;
  } catch (error) {
    console.error(error);
  }
};

const CompendiumPage = () => {
  //const compendiumState = useAppSelector(selectCompendium);
  //const equipmentArray = compendiumState.compendium?.data.equipment;
  const [element, setElement] = useState<T_CompendiumElement | null>(null);
  const { isoCode } = useParams();

  const getElement = async () => {
    const elementData: T_CompendiumElement = await fetchCompendiumByIsoCode(
      isoCode!,
    );
    console.log(elementData);
    setElement(elementData);
  };

  useEffect(() => {
    // Limpiando el efecto
    // Mas info https://es.reactjs.org/docs/hooks-reference.html#cleaning-up-an-effect
    return () => {
      getElement();
    };
  }, []);

  //const id = Number(isoCode);
  //console.log(compendiumState);
  //console.log(equipmentArray);

  /* const fetchCompendiumElementByID = () => {
    console.log(compendiumState.compendium);
    console.log(equipmentArray);
    const compendiumElement = equipmentArray
      ? equipmentArray.find((element) => element.id === id)
      : null;
    console.log(compendiumElement);
    ?(equipmentArray.filter((cElement: T_CompendiumElement) => {
          // Buscamos por su ID
          return searchString.test(cElement.id);
        }) as T_BOTWCompendiumArray)
      : ([] as T_BOTWCompendiumArray);
    return compendiumElement;

    const equipmentArray = compendiumState.compendium?.data.equipment;
    const compendiumElement = equipmentArray
      ? (equipmentArray.filter((cElement: T_CompendiumElement) => {
          // Buscamos por su ID
          return searchString.test(cElement.id);
        }) as T_BOTWCompendiumArray)
      : ([] as T_BOTWCompendiumArray);
    return null;
  };
  let compendiumElement;
  if (compendiumState.compendium) {
    compendiumElement = fetchCompendiumElementByID();
    console.log(compendiumElement);
  } */
  /* console.log('Element');
  console.log(element?.name!); */

  const e_name = element?.name;
  const e_image = element?.image;
  const e_category = element?.category;
  const e_description = element?.description;
  const e_location1 = element?.common_locations[0];
  const e_location2 = element?.common_locations[1];
  /* element as T_Food
  switch (e_category) {
    case 'food': {
      const e_cookingEffect = element:T_Food?.cooking_effect;
      break;
    }
  } */

  return (
    element && (
      <>
        <h2>{e_name}</h2>
        <picture>
          <img src={e_image} alt={e_name} />
        </picture>
        <h3>{e_category}</h3>
        <p>{e_description}</p>
        <p>Common Location:</p>
        <p>{e_location1}</p>
        <p>{e_location2}</p>
      </>
    )
  );
};

export default CompendiumPage;
