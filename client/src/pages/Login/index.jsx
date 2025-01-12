import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

const Login = () => {
  return (
    <>
      <div className="login-form">
        <span className="title gradient-text">Login</span>
        <form className="form">
          <div className="wrap-input">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Type your email"
            />
            <span className="form-focus">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
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
        <div className="register-btn">
          <span>Don{"'"}t have an account? </span>
          <Link to="/register">
            <span className="redirect">Create</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
