import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import * as currentUserActions from '../../actions/current-user/current-user.actions';

interface IProps extends RouteComponentProps<{}> {
    logoutUser: (user: null) => void
}

class LogoutComponent extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public componentDidMount() {
        this.props.logoutUser(null);
    }

    public render() {
        return null;
    }
}
const mapDispatchToProps = {
    logoutUser: currentUserActions.updateCurrentUser
}

export default connect(null, mapDispatchToProps)(LogoutComponent);
