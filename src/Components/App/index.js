import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Navigation, { withNavigation } from '../Navigation/';
import LandingPage from '../Landing';
import SignUpPage from '../Sign Up';
import LogInPage from '../Login';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import Firebase, { withFirebase, FirebaseContext } from '../Firebase';
import * as ROUTES from '../../Constants/routes';
import { withAuthentication } from '../Session';
import Box from '@material-ui/core/Box';

var LogIn = React.createElement(LogInPage)

const App = () => (
  <React.Fragment>
      <div>
        
          <Router>
            <div>
          
            <main>
            

            <hr />
                <Route exact path={ROUTES.LANDING} component={LandingPage} />

                <Route path={ROUTES.SIGNUP} component={SignUpPage} />
                <Route path={ROUTES.LOGIN} component={LogInPage} /> 
                <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                <Route path={ROUTES.HOME} component={HomePage} />
                <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                <Route path={ROUTES.ADMIN} component={AdminPage} />
            
          </main>
          </div>
        </Router>
        
      </div>
    </React.Fragment>
    );

export default withAuthentication(App);