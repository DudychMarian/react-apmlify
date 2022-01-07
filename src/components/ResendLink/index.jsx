import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { createToast } from 'vercel-toast';

import logo from '../../assets/img/logo.jpeg';
import styles from './ResendLink.module.scss';
import { Link } from 'react-router-dom';

export const ResendLink = () => {
  const [email, setEmail] = useState('');

  const onFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await Auth.resendSignUp(email);
      createToast('Check your email address', {
        timeout: 5000,
        type: 'success',
      });
    } catch (err) {
      console.log('Error confirming sign up', err);
      createToast(err.message, {
        timeout: 5000,
        type: 'error',
      });
    }
  };

  return (
    <div className="formWrapper">
      <div className="formMain">
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <form onSubmit={onFormSubmit} className={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <button type="submit">Send confirmation email</button>
        </form>
        <Link to="/signin" className={styles.link}>
          <span>Back to sign in</span>
        </Link>
      </div>
    </div>
  );
};
