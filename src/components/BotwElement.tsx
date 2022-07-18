import { useAppSelector } from '../app/hooks';
import { Link } from 'react-router-dom';
import { selectCompendium } from '../features/hyruleCompendium/hyruleCompendiumSlice';
import { T_ElementPage } from '../types';

const CompendiumElementPage = () => {
  const compendiumState = useAppSelector(selectCompendium);

  let c_name, c_imgSrc, c_id;
  //const { c_name, c_imgSrc, c_id }: T_ElementPage = compendiumState.ePage;
  let c_class = String(c_id);

  return (
    <Link to={`/compendium/${c_id}`} className={c_class}>
      <section>
        <picture>
          <img src={c_imgSrc} alt={c_name} />
        </picture>
        <h2>{c_name}</h2>
      </section>
    </Link>
  );
};

export default CompendiumElementPage;
