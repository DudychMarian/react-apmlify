import React, { useState } from 'react';
import Auth from '@aws-amplify/auth';
import { useHistory } from 'react-router-dom';

import logo from '../../../assets/img/logo.jpeg';

import styles from './StepOne.module.scss';

export const StepOne = () => {
  const [dob, setDob] = useState('');
  const [lastName, setLastName] = useState('');

  const history = useHistory();

  const next = async (e) => {
    e.preventDefault();

    let user = await Auth.currentAuthenticatedUser();

    let result = await Auth.updateUserAttributes(user, {
      'custom:dob': dob,
      family_name: lastName,
    });
    //====
    console.log(result);
    //====
    history.push('/stepTwo');
  };

  return (
    <div>
      <div className="formWrapper">
        <div className="formMain">
          <img src={logo} alt="logo" className={styles.logo} />
          <div className={styles.form}>
            <h1 className={styles.title}>User Detail</h1>
            <form onSubmit={next}>
              <div className={styles.inputWrapper}>
                <input
                  id="lastName"
                  placeholder="Last name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <input
                  id="DOB"
                  placeholder="Date of Birth"
                  value={dob}
                  type="date"
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>
              <button>Next</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
