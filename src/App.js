import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import { StepOne } from './page/Attributes/StepOne';
import { StepTwo } from './page/Attributes/StepTwo';
import { Home } from './page/Home';
import { Unfortunately } from './page/Unfortunately';

Amplify.configure(awsconfig);

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const assessLoggedInState = () => {
    Auth.currentAuthenticatedUser()
      .then((sess) => {
        console.log('logged in');

        //====
        console.log('sess:', sess);
        //====

        setLoggedIn(true);
      })
      .catch(() => {
        console.log('not logged in');
        setLoggedIn(false);
      });
  };
  useEffect(() => {
    assessLoggedInState();
  }, []);

  const signOut = async () => {
    try {
      await Auth.signOut();
      setLoggedIn(false);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  return (
    <div className="App">
      <header className="nav">
        {loggedIn ? (
          <div className="nav-item">
            <div className="navWrapper">
              <Link to="/">
                <button>Home</button>
              </Link>
              <Link to="/stepOne">
                <button>Attributes</button>
              </Link>
            </div>
            <button onClick={signOut}>Log Out</button>
          </div>
        ) : (
          <div className="nav-item">
            <Link to="/">
              <button>Home</button>
            </Link>
            <div className="navWrapper">
              <Link to="/signin">
                <button>Log In</button>
              </Link>
              <Link to="/signup">
                <button>Register</button>
              </Link>
            </div>
          </div>
        )}
      </header>
      <Route exact path="/">
        {loggedIn ? <Home /> : <p>Please sign in</p>}
      </Route>
      <Route exact path="/signin">
        <SignIn onSignin={assessLoggedInState} />
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
      <Route exact path="/forgotPassword">
        <ForgotPassword />
      </Route>
      <Route exact path="/stepOne">
        <StepOne />
      </Route>
      <Route exact path="/stepTwo">
        <StepTwo />
      </Route>
      <Route exact path="/unfortunately">
        <Unfortunately />
      </Route>
    </div>
  );
}

export default App;
