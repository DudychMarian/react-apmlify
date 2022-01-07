import Auth from '@aws-amplify/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [data, setData] = useState({});

  const next = async () => {
    let attributes = await Auth.currentAuthenticatedUser();

    setData(attributes.attributes);
  };

  React.useEffect(() => {
    try {
      next();
    } catch (err) {
      console.log('Error ', err);
    }
  }, []);

  return (
    <div className="longWrapper">
      <h1>Data:</h1>
      {Object.entries(data).map(([key, val], i) => (
        <p key={i}>
          {key}: <b>{val}</b>
        </p>
      ))}
      <hr />
      <Link to="/settings">
        <button>Settings</button>
      </Link>
    </div>
  );
};
