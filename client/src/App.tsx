import * as React from 'react';
import './App.css';
import './include/bootstrap';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { store } from './Store';
import SignInComponent from './components/sign-in/sign-in.component';
import ReimbursementComponent from './components/reimbursement/reimbursement.component'
import PaginationComponent from './components/pagination/pagination.component'
import { AppNav } from './components/nav/nav.component';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <AppNav />
            <div id="main-content-container">
              <Switch>
                <Route path="/pagination" component={PaginationComponent} />
                <Route path="/reimbursements" component={ReimbursementComponent} />
                <Route path="/sign-in" component={SignInComponent} />
                <Route component={SignInComponent} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
