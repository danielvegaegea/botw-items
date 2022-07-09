import botwLogo from '../assets/svg/botw-logo.svg';
import { Link } from 'react-router-dom';

const BotwHeader = () => {
  return (
    <>
      <img src={botwLogo} className="counter-logo" alt="logo" />
      <h2>The Legend of Zelda: Breath of the Wild's Vade Mecum</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/vade-mecum">Vade Mecum</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default BotwHeader;
