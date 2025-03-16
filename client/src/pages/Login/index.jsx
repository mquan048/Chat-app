import { useLayoutEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../../hooks';

import './style.scss';

const Login = () => {
  const navigate = useNavigate();

  const { isLogged, login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  useLayoutEffect(() => {
    if (isLogged) {
      navigate('/home');
    }
  }, [isLogged, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      login({
        email: email,
        password: password,
      });
    } catch (error) {
      //handle login error
      console.error(error);
    }
  };

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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              type={isShowPassword ? 'text' : 'password'}
              className="form-control"
              id="password"
              placeholder="Type your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <span className="form-focus">
              <FontAwesomeIcon icon={faLock} className="icon" />
              <FontAwesomeIcon
                icon={isShowPassword ? faEyeSlash : faEye}
                className="showPassword"
                onClick={() => setIsShowPassword(!isShowPassword)}
              />
            </span>
          </div>
          <button className="form-btn" onClick={(event) => handleSubmit(event)}>
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
