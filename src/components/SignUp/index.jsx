import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Link, useHistory } from 'react-router-dom';
import { createToast } from 'vercel-toast';

import logo from '../../assets/img/logo.jpeg';
import successful from '../../assets/img/successful.png';

import styles from './SignIn.module.scss';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [confirmUsername, setConfirmUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();

  const signUp = async (e) => {
    e.preventDefault();

    try {
      if (username !== confirmUsername) {
        createToast('Email are not the same', {
          timeout: 5000,
          type: 'error',
        });
        return;
      }

      if (password !== confirmPassword) {
        createToast('Passwords are not the same', {
          timeout: 5000,
          type: 'error',
        });
        return;
      }

      await Auth.signUp(username, password);
      setStep(2);
    } catch (error) {
      createToast(error.message, {
        timeout: 5000,
        type: 'error',
      });
    }
  };

  return (
    <div className="singup">
      <div className="formWrapper">
        <div className="formMain">
          {step === 1 && (
            <>
              <img src={logo} alt="logo" className={styles.logo} />
              <div className={styles.form}>
                <h1 className={styles.title}>Sign Up</h1>
                <form onSubmit={signUp}>
                  <div className={styles.inputWrapper}>
                    <input
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      placeholder="Email"
                      type="email"
                      required
                    />
                    <input
                      value={confirmUsername}
                      onChange={(event) => setConfirmUsername(event.target.value)}
                      placeholder="Confirm Email"
                      type="email"
                      required
                    />
                    <input
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Password"
                      type="password"
                      required
                    />
                    <input
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      placeholder="Confirm password"
                      type="password"
                      required
                    />
                  </div>
                  <button>Sign Up</button>
                </form>
              </div>
              <p>
                Have account?{' '}
                <Link to="/signin">
                  <b className={styles.link}>Login</b>
                </Link>
              </p>
            </>
          )}
          {step === 2 && (
            <>
              <img src={successful} alt="Successful" />
              <h2>Verification link send to your email</h2>
              <button onClick={() => history.push('/signin')}>
                Back to <b>Login</b>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
