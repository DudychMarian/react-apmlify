import React from 'react';
import { Link } from 'react-router-dom';

import cross from '../../assets/img/cross.png';
import styles from './Unfortunately.module.scss';

export const Unfortunately = () => {
  return (
    <div className="formWrapper">
      <div className="formMain">
        <img src={cross} alt="Unfortunately" />
        <p className={styles.info}>
          Unfortunately, we're unable to complete your registration for online self-service. Please
          check the details you have entered below are correct and click the Try Again button to
          amend if required. Otherwise, please contact us on live chat, email or phone us on{' '}
          <b>0370 908 3481</b> so that we can help Please quote code: Support 2 when you contact us.
        </p>
        <Link to="/stepOne">
          <button>Try Again</button>
        </Link>
      </div>
    </div>
  );
};
