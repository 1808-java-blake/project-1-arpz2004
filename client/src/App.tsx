import * as React from 'react';
import './App.css';
import './include/bootstrap';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import { store } from './Store';
import SignInComponent from './components/sign-in/sign-in.component';
import ReimbursementTableComponent from './components/reimbursement/reimbursement-table.component'
import CreateReimbursementComponent from './components/reimbursement/create-reimbursement.component'
import { AppNav } from './components/nav/nav.component';
import history from './history'
import { User } from './model/User';

export const getCurrentUser = () => {
  const currentUser = store.getState().currentUser;
  return currentUser ? new User(currentUser) : null;
}

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <AppNav />
            <div id="main-content-container">
              <Switch>
                <Route path="/reimbursements/new" component={CreateReimbursementComponent} />
                <Route path="/reimbursements" component={ReimbursementTableComponent} />
                <Route path="/sign-in" component={SignInComponent} />
                <Route component={SignInComponent} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
