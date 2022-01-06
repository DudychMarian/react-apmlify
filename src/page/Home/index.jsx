import Auth from '@aws-amplify/auth';
import React, { useState } from 'react';

export const Home = () => {
  const [data, setData] = useState({});

  const next = async () => {
    let attributes = await Auth.currentAuthenticatedUser();

    setData(attributes.attributes);
  };

  React.useEffect(() => {
    next();
  }, []);

  return (
    <div className="home">
      <h1>Data:</h1>
      {Object.entries(data).map(([key, val], i) => (
        <p key={i}>
          {key}: <b>{val}</b>
        </p>
      ))}
    </div>
  );
};
