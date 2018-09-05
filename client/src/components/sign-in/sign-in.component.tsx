import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ISignInState, IState } from '../../reducers';
import * as signInActions from '../../actions/sign-in/sign-in.actions';
import * as currentUserActions from '../../actions/current-user/current-user.actions';
import { connect } from 'react-redux';
import { User } from '../../model/User';

interface IProps extends RouteComponentProps<{}>, ISignInState {
  updateCurrentUser: (currentUser: User | null) => void
  updateError: (message: string) => void
  updatePassword: (password: string) => void
  updateUsername: (username: string) => void
  login: (e: React.FormEvent<HTMLFormElement>, credentials: any) => void
}

class SignInComponent extends React.Component<IProps, {}> {

  constructor(props: any) {
    super(props);
  }

  public componentDidUpdate = (prevProps: any) => {
    if (this.props.currentUser !== prevProps.currentUser) {
      this.props.updateCurrentUser(this.props.currentUser);
    }
  }

  public render() {
    const { errorMessage, credentials } = this.props;
    return (
      <form className="form-signin" onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.props.login(e, this.props.credentials)}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

        <label htmlFor="inputUsername" className="sr-only">Username</label>
        <input
          onChange={(e: any) => this.props.updateUsername(e.target.value)}
          value={credentials.username}
          type="text"
          id="inputUsername"
          className="form-control"
          placeholder="Username"
          required />

        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input
          onChange={(e: any) => this.props.updatePassword(e.target.value)}
          value={credentials.password}
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required />

        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        {errorMessage && <p id="error-message">{errorMessage}</p>}
      </form>
    );
  }
}

const mapStateToProps = (state: IState) => (state.signIn);
const mapDispatchToProps = {
  login: signInActions.login,
  updateCurrentUser: currentUserActions.updateCurrentUser,
  updateError: signInActions.updateError,
  updatePassword: signInActions.updatePassword,
  updateUsername: signInActions.updateUsername
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInComponent);

