import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from '../../App';

export class ProtectedRoute extends React.Component<any, {}> {
    public render() {
        const { component: Component, ...props } = this.props

        return (
            <Route
                {...props}
                render={prop => (
                    getCurrentUser() ?
                        (this.props.component ?
                            <Component {...prop} /> :
                            <Redirect to='/reimbursements' />) :
                        <Redirect to='/sign-in' />
                )
                }
            />
        )
    }
}