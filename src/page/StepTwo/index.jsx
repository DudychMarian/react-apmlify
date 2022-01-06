import React, { useState, useEffect } from 'react';
import Auth from '@aws-amplify/auth';
import { useHistory } from 'react-router-dom';

import logo from '../../assets/img/logo.jpeg';

import styles from './StepOne.module.scss';

export const StepTwo = () => {
  const [lastName, setLastName] = useState([]);
  const [policyId, setPolicyId] = useState('');
  const [postCode, setPostCode] = useState('');

  const history = useHistory();

  useEffect(() => {
    const fetch = async () => {
      let attributes = await Auth.currentAuthenticatedUser();
      setLastName(attributes.attributes.family_name);
    };
    fetch();
  }, []);

  const next = async (e) => {
    e.preventDefault();

    let user = await Auth.currentAuthenticatedUser();

    let result = await Auth.updateUserAttributes(user, {
      'custom:policyId': policyId,
      zoneinfo: postCode,
    });
    //====
    console.log(result);
    //====
    history.push('/');
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
                <input type="text" value={lastName} disabled />
                <input
                  id="policyId"
                  placeholder="Policy Id"
                  value={policyId}
                  type="number"
                  onChange={(e) => setPolicyId(e.target.value)}
                  required
                />
                <input
                  id="postCode"
                  placeholder="Post Code"
                  type="text"
                  value={postCode}
                  onChange={(e) => setPostCode(e.target.value)}
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
