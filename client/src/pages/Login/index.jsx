import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

const Login = () => {
  return (
    <>
      <div className="login">
        <span className="title gradient-text">Login</span>
        <form className="form">
          <div className="wrap-input">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Type your username"
            />
            <span className="form-focus">
              <FontAwesomeIcon icon={faUser} className="icon" />
            </span>
          </div>
          <div className="wrap-input">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Type your password"
            />
            <span className="form-focus">
              <FontAwesomeIcon icon={faLock} className="icon" />
            </span>
          </div>
          <button type="submit" className="form-btn">
            LOGIN
          </button>
        </form>
        <div className="register">
          <span>Don{"'"}t have an account? </span>
          <Link to="/register">
            <span className="redirect">Create </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
