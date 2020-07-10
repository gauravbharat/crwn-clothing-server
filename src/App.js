import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Authentication from './pages/authentication/authentication.component';
import Header from './components/header/header.component';
import NoMatch from './pages/no-match/no-match.component';
import { setCurrentUser } from './redux/user/user.actions';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  unsubscribeFromAuth = null;

  resetUserState = () => this.props.setCurrentUser(null);

  componentDidMount() {
    // onAuthStateChanged is a open subscription (open message system) between the app and firebase
    // that is, whenever any changes occur on firebase, firebase sends out a message that user has updated
    // This will automatically check for user login status
    // since this is an open subscription, we also want to close the subscription since we don't want any memory leaks from JavaScript
    // onAuthStateChanged returns a function inside the unsubscribeFromAuth property, which when called when component unmounts
    // would closes the subscription
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        try {
          const userRef = await createUserProfileDocument(userAuth);

          if (!userRef) throw Error('Error getting user documentRef');

          // Get the data from document ref object using snapshot.data() method
          userRef.onSnapshot(snapshot => {
            this.props.setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            });
          });
        } catch (error) {
          console.log('Error getting user login details', error.message);
          this.resetUserState();
        }
      } else {
        this.resetUserState();
      }
    });
  }

  componentWillUnmount() {
    // unsubscribe from auth when component unmounts
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={Authentication} />
          <Route path='*' component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
