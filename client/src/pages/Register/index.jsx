import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

const Register = () => {
  return (
    <>
      <div className="register-form">
        <span className="title gradient-text">Register</span>
        <form className="form">
          <div className="wrap-input">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Type your name"
            />
            <span className="form-focus">
              <FontAwesomeIcon icon={faUser} className="icon" />
            </span>
          </div>
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
          <div className="wrap-input">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm your password"
            />
            <span className="form-focus">
              <FontAwesomeIcon icon={faLock} className="icon" />
            </span>
          </div>
          <button type="submit" className="form-btn">
            LOGIN
          </button>
        </form>
        <div className="login-btn">
          <span>Have an account? </span>
          <Link to="/login">
            <span className="redirect">Login Here</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
