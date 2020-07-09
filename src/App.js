import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Authentication from './pages/authentication/authentication.component';
import Header from './components/header/header.component';
import { auth } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    // onAuthStateChanged is a open subscription (open message system) between the app and firebase
    // that is, whenever any changes occur on firebase, firebase sends out a message that user has updated
    // This will automatically check for user login status
    // since this is an open subscription, we also want to close the subscription since we don't want any memory leaks from JavaScript
    // onAuthStateChanged returns a function inside the unsubscribeFromAuth property, which when called when component unmounts
    // would closes the subscription
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    // unsubscribe from auth when component unmounts
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={Authentication} />
        </Switch>
      </div>
    );
  }
}

export default App;
