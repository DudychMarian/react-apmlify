import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Link, useHistory } from 'react-router-dom';
import { createToast } from 'vercel-toast';

import logo from '../../assets/img/logo.jpeg';

import styles from './ForgotPassword.module.scss';

const ForgotPassword = () => {
  const [stage, setStage] = useState(1);
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const forgotPassword = async (e) => {
    try {
      e.preventDefault();
      await Auth.forgotPassword(username).then((data) => console.log(data));
      setStage(2);
    } catch (error) {
      createToast(error.message, {
        timeout: 5000,
        type: 'error',
      });
    }
  };

  const forgotPasswordSubmit = async (e) => {
    try {
      e.preventDefault();
      await Auth.forgotPasswordSubmit(username, code, password).then((data) => console.log(data));
      history.push('/signin');
    } catch (error) {
      createToast(error.message, {
        timeout: 5000,
        type: 'error',
      });
    }
  };

  return (
    <div className="forgotPassword">
      <div className="formWrapper">
        <div className="formMain">
          <img src={logo} alt="logo" className={styles.logo} />
          <div className={styles.form}>
            <h1 className={styles.title}>Forgot Password</h1>
            {stage === 1 && (
              <form onSubmit={forgotPassword} className="Forgot-Password-form">
                <div className={styles.inputWrapper}>
                  <input
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Email Address"
                    type="email"
                  />
                </div>
                <button type="submit" className={styles.btn}>
                  Send verification code
                </button>
              </form>
            )}
            {stage === 2 && (
              <form onSubmit={forgotPasswordSubmit} className="Forgot-Password-form">
                <div className={styles.inputWrapper}>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Email"
                    disabled
                  />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password"
                  />
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Code"
                  />
                </div>
                <button type="submit" className={styles.btn}>
                  Change password
                </button>
              </form>
            )}
          </div>
          <Link to="/signin">
            <b className={styles.rLink}>Back to Login</b>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
