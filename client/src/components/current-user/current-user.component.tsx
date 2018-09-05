import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IState, ICurrentUserState } from '../../reducers';
import * as currentUserActions from '../../actions/current-user/current-user.actions';
import { connect } from 'react-redux';
import { User } from '../../model/User';

interface IProps extends RouteComponentProps<{}>, ICurrentUserState {
    updateCurrentUser: (currentUser: User | null) => void
}

class CurrentUserComponent extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public componentDidUpdate = () => {
        console.log("TEST123");
        this.props.updateCurrentUser(this.props.currentUser);
    }

    public render() {
        return (null);
    }
}

const mapStateToProps = (state: IState) => (state.currentUser);
const mapDispatchToProps = {
    updateCurrentUser: currentUserActions.updateCurrentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUserComponent);

