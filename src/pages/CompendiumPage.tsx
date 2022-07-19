import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { T_CompendiumElement, T_GenericElement } from '../types';
import { capitalizeWords } from '../tools/tools';

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
  const [element, setElement] = useState<T_CompendiumElement | null>(null);
  const { isoCode } = useParams();

  const getElement = async () => {
    const elementData: T_CompendiumElement = await fetchCompendiumByIsoCode(
      isoCode!,
    );
    setElement(elementData);
  };

  useEffect(() => {
    return () => {
      getElement();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Processing the data and creating variables and constants.
  //    Preparing pElement
  let pElement: T_GenericElement;
  pElement = element ? element : null;
  //    Common elements
  const e_name = capitalizeWords(pElement ? pElement.name : '-');
  const e_image = pElement ? pElement.image : '';
  const e_category = capitalizeWords(pElement ? pElement.category : '-');
  const e_description = pElement ? pElement.description : '-';
  let e_location = [];
  e_location[1] = '(None)';
  //    Label for the Drops prop.
  let hLabel = '';
  let eLabel = [];

  // Contitions of elements to render.
  //  Common Locations section
  if (pElement?.common_locations) {
    for (let i = 0; i < 4; i++) {
      e_location[i] = pElement?.common_locations
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
        for (let i = 1; i < 13; i++) {
          eLabel[i] =
            pElement?.drops![i - 1] !== undefined
              ? capitalizeWords(pElement?.drops[i - 1])
              : '';
        }
      }
    }
  }

  return (
    element && (
      <>
        <h2>{e_name}</h2>
        <picture>
          <img src={e_image} alt={e_name} />
        </picture>
        <div>
          <h3>Category: {e_category}</h3>
        </div>
        <div>
          <h3>Description:</h3>
          <p>{e_description}</p>
        </div>
        <div>
          <h3>Common Location:</h3>
          <p>{e_location[0]}</p>
          <p>{e_location[1]}</p>
          <p>{e_location[2]}</p>
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
      </>
    )
  );
};

export default CompendiumPage;
