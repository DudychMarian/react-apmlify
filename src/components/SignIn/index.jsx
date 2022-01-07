import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Link, useHistory } from 'react-router-dom';
import { createToast } from 'vercel-toast';

import logo from '../../assets/img/logo.jpeg';

import styles from './SignIn.module.scss';

const Signin = ({ onSignin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const signIn = async () => {
    try {
      await Auth.signIn(username, password);
      history.push('/stepOne');
      onSignin();
    } catch (error) {
      createToast(error.message, {
        timeout: 5000,
        type: 'error',
      });
      console.log('error signing in', error);
    }
  };

  return (
    <div className="login">
      <div className="formWrapper">
        <div className="formMain">
          <img src={logo} alt="logo" className={styles.logo} />
          <div className={styles.form}>
            <h1 className={styles.title}>Login</h1>
            <div className={styles.inputWrapper}>
              <input
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                id="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button id="signinButton" onClick={signIn}>
              Sign In
            </button>
          </div>
          <Link to="/signup">
            <b className={styles.rLink}>Register</b>
          </Link>
          <br />
          <Link to="/forgotPassword">
            <span className={styles.fLink}>Forgot password?</span>
          </Link>
          <br />
          <Link to="/resendLink" className={styles.fLink}>
            Send confirmation email again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
