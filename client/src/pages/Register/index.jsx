import { useState } from 'react';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

import './style.scss';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(false);

  const checkIsEmailExist = () => {};

  const handleSubmit = () => {};

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
              value={formData.name}
              onChange={(event) =>
                setFormData({ ...formData, name: event.target.value })
              }
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
              value={formData.email}
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
              onBlur={checkIsEmailExist}
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
              value={formData.password}
              onChange={(event) =>
                setFormData({ ...formData, password: event.target.value })
              }
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
          <div className="wrap-input">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type={isShowPassword ? 'text' : 'password'}
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  confirmPassword: event.target.value,
                })
              }
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
          <button type="submit" className="form-btn">
            REGISTER
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
