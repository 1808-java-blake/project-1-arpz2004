import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ISignInState, IState } from '../../reducers';
import * as signInActions from '../../actions/sign-in/sign-in.actions';
import { connect } from 'react-redux';

interface IProps extends RouteComponentProps<{}>, ISignInState {
  updateError: (message: string) => void
  updatePassword: (password: string) => void,
  updateUsername: (username: string) => void,
  login: (e: React.FormEvent<HTMLFormElement>, credentials: any) => void
}

class SignInComponent extends React.Component<IProps, {}> {

  constructor(props: any) {
    super(props);
  }

  public submit = (e: React.FormEvent<HTMLFormElement>) => {
    this.props.login(e, this.props.credentials);
  }

  public passwordChange = (e: any) => {
    this.props.updatePassword(e.target.value);
  }

  public usernameChange = (e: any) => {
    this.props.updateUsername(e.target.value);
  }


  public render() {
    const { errorMessage, credentials } = this.props;

    return (
      <form className="form-signin" onSubmit={this.submit}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

        <label htmlFor="inputUsername" className="sr-only">Username</label>
        <input
          onChange={this.usernameChange}
          value={credentials.username}
          type="text"
          id="inputUsername"
          className="form-control"
          placeholder="Username"
          required />

        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input
          onChange={this.passwordChange}
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
  updateError: signInActions.updateError,
  updatePassword: signInActions.updatePassword,
  updateUsername: signInActions.updateUsername
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInComponent);

