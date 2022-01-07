import React, { useState } from 'react';
import Auth from '@aws-amplify/auth';
import { createToast } from 'vercel-toast';

import logo from '../../assets/img/logo.jpeg';
import styles from './Settings.module.scss';

export const Settings = () => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [stage, setStage] = useState(1);

  const onEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { email: email });
      setStage(2);
    } catch (err) {
      console.log('Error: ', err);
      createToast(err.message, {
        timeout: 5000,
        type: 'error',
      });
    }
  };

  const onFinishEmailChange = async (e) => {
    e.preventDefault();

    try {
      await Auth.verifyCurrentUserAttributeSubmit('email', code);
      setStage(1);
      createToast('Success', {
        timeout: 5000,
        type: 'success',
      });
    } catch (err) {
      console.log('Error: ', err);
      createToast(err.message, {
        timeout: 5000,
        type: 'error',
      });
    }
  };

  const onPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      if (password !== confirmPassword) {
        createToast('Passwords are not the same', {
          timeout: 5000,
          type: 'error',
        });
        return;
      }
      await Auth.changePassword(currentUser, oldPassword, confirmPassword);
      createToast('Success', {
        timeout: 5000,
        type: 'success',
      });
    } catch (err) {
      console.log('Error: ', err);
      createToast(err.message, {
        timeout: 5000,
        type: 'error',
      });
    }
  };

  return (
    <div className="longWrapper">
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <h1>Settings</h1>
        <div>
          <h3>Change email</h3>
          {stage === 1 && (
            <form className={styles.form} onSubmit={onEmailSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="New email"
                required
              />
              <input
                type="email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                placeholder="Confirm new email"
                required
              />
              <button type="submit">Next</button>
            </form>
          )}
          {stage === 2 && (
            <form className={styles.form} onSubmit={onFinishEmailChange}>
              <input type="email" value={email} placeholder="Email" disabled />
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Code"
                required
              />
              <button type="submit">Confirm</button>
            </form>
          )}
        </div>
        <div>
          <form className={styles.form} onSubmit={onPasswordSubmit}>
            <h3>Change Password</h3>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Old password"
              required
            />
            <hr />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
            <button type="submit">Confirm</button>
          </form>
        </div>
      </div>
    </div>
  );
};
