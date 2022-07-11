/* import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
 */
/* const fetchCompendiumByIsoCode = async (isoCode: string) => {
  try {
    const reponse = await fetch(
      `https://botw-compendium.herokuapp.com/api/v2${isoCode}`,
    );
    const [compendiumElement] = await reponse.json();
    return compendiumElement;
  } catch (error) {
    console.error(error);
  }
}; */

const CompendiumPage = () => {
  return (
    <>
      <p>Placeholder Compendium</p>
    </>
  );
};

export default CompendiumPage;
