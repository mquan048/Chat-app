import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

const NavBar = () => {
  return (
    <>
      <div className="navbar">
        <div className="container">
          <Link to="/">
            <div className="logo">
              <FontAwesomeIcon icon={faComments} className="icon" size="2x" />
              <span className="title gradient-text">Chat app</span>
            </div>
          </Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
