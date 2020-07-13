import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Authentication from './pages/authentication/authentication.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import NoMatch from './pages/no-match/no-match.component';
import { setCurrentUser } from './redux/user/user.actions';
import { currentUserSelector } from './redux/user/user.selectors';

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
          {/* Shop page would have sub-routes under it e.g. shop/jackets, etc., hence exact keyword not used for path */}
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          {/* Use conditional render, if user is signed-in Redirect to Homepage OR to sign-in page if user is logged-out */}
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? <Redirect to='/' /> : <Authentication />
            }
          />
          <Route path='*' component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: currentUserSelector
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
