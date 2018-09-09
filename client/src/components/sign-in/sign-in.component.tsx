import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Button } from 'reactstrap';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
import Form from 'reactstrap/lib/Form';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import * as currentUserActions from '../../actions/current-user/current-user.actions';
import * as signInActions from '../../actions/sign-in/sign-in.actions';
import { User } from '../../model/User';
import { ISignInState, IState } from '../../reducers';

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
      <Container className="col-md-3 col-md-offset-3 border border-primary rounded bg-light" id="login-form">
        <div className="form-signin">
          <h5>Sign In To Start a Reimbursement Request</h5>
          <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.props.login(e, this.props.credentials)}>
            <Col>
              <FormGroup>
                <Input
                  onChange={(e: any) => this.props.updateUsername(e.target.value)}
                  value={credentials.username}
                  type="text"
                  id="inputUsername"
                  className="form-control"
                  placeholder="Username"
                  required
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input
                  onChange={(e: any) => this.props.updatePassword(e.target.value)}
                  value={credentials.password}
                  type="password"
                  id="inputPassword"
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </FormGroup>
            </Col>
            <Button color="primary" className="btn btn-lg btn-block" type="submit">Sign In</Button>
          </Form>
          {errorMessage && <p id="error-message">{errorMessage}</p>}
        </div>
      </Container>
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

