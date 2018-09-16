import * as signInActions from '../actions/sign-in/sign-in.actions';
import { signInTypes } from "../actions/sign-in/sign-in.types";

describe('sign-in actions', () => {
    it('should create an action to update username', () => {
        const username = 'username123'
        const expectedAction = {
            payload: {
                username
            },
            type: signInTypes.UPDATE_USERNAME
        }
        expect(signInActions.updateUsername(username)).toEqual(expectedAction)

    })

    it('should create an action to update password', () => {
        const password = 'pass'
        const expectedAction = {
            payload: {
                password
            },
            type: signInTypes.UPDATE_PASSWORD
        }
        expect(signInActions.updatePassword(password)).toEqual(expectedAction)
    })

    it('should create an action to update sign in error message', () => {
        const errorMessage = 'Invalid username or password'
        const expectedAction = {
            payload: {
                errorMessage
            },
            type: signInTypes.UPDATE_ERROR
        }
        expect(signInActions.updateError(errorMessage)).toEqual(expectedAction)
    })

    it("should create an action to login user", async () => {
        const dispatch = jest.fn();
        const event: any = { preventDefault: () => null };
        const credentials: any = { credentials: { password: 'test', username: 'test' } }
        await signInActions.login(event, credentials)(dispatch);
        expect(dispatch).toBeCalledWith(
            {
                payload: {
                    currentUser: null,
                    errorMessage: 'Failed to login at this time'
                },
                type: signInTypes.LOGIN
            });
    });

})