import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../hooks';
import toast from 'react-hot-toast';

import './style.scss';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const checkIsEmailExist = () => {};

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrorMessage('Missing some fields');
    } else if (formData.password != formData.confirmPassword) {
      setErrorMessage('The password and the confirm password are not match');
    } else {
      try {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        toast.success('Register account succeed!');
        setErrorMessage(null);
        navigate('/login');
      } catch (error) {
        setErrorMessage(error.response.data.message);
        console.error(error.response.data.message);
      }
    }
  };

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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button
            type="submit"
            className="form-btn"
            onClick={(event) => handleSubmit(event)}
          >
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
