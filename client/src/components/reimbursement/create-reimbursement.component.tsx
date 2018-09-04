import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IState, ICreateReimbursementState } from '../../reducers';
import * as createReimbursementActions from '../../actions/reimbursement/create-reimbursement.actions';
import { connect } from 'react-redux';
import { Reimbursement } from '../../model/Reimbursement';
import NumberFormat from 'react-number-format';

interface IProps extends RouteComponentProps<{}>, ICreateReimbursementState {
  updateError: (message: string) => void
  updateAmount: (amount: string) => void,
  updateDescription: (description: string) => void,
  updateType: (type: string) => void,
  createReimbursement: (e: React.FormEvent<HTMLFormElement>, reimbursement: Reimbursement) => void
}

class CreateReimbursementComponent extends React.Component<IProps, {}> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    const { errorMessage, reimbursement } = this.props;

    return (
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => (this.props.createReimbursement(e, this.props.reimbursement))}>
        <h1 className="h3 mb-3 font-weight-normal">Enter reimbursement details</h1>
        <div className="input-group mb-3">
          <label htmlFor="inputAmount" className="sr-only">Amount</label>
          <NumberFormat
            prefix={'$'}
            decimalScale={2}
            fixedDecimalScale={true}
            thousandSeparator={true}
            allowNegative={false}
            isNumericString={true}
            onValueChange={(values) => this.props.updateAmount(values.formattedValue)}
            value={reimbursement.amount === 0 ? '' : reimbursement.amount}
            id="inputAmount"
            className="form-control"
            placeholder="Amount"
            isAllowed={(val) => +val.value <= 999999.99 && val.value.length <= 9}
            required />
        </div>

        <label htmlFor="inputDescription" className="sr-only">Description</label>
        <textarea
          onChange={(e: any) => this.props.updateDescription(e.target.value)}
          value={reimbursement.description}
          maxLength={250}
          id="inputDescription"
          className="form-control"
          placeholder="Description"
          required />

        <div className="form-group">
          <label htmlFor="inputType">Type:</label>
          <select
            className="form-control"
            id="inputType"
            value={reimbursement.type}
            onChange={(e: any) => this.props.updateType(e.target.value)}>
            <option>Lodging</option>
            <option>Travel</option>
            <option>Food</option>
            <option>Other</option>
          </select>
        </div>

        <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
        {errorMessage && <p id="error-message">{errorMessage}</p>}
      </form>
    );
  }
}

const mapStateToProps = (state: IState) => (state.createReimbursement);
const mapDispatchToProps = {
  createReimbursement: createReimbursementActions.createReimbursement,
  updateAmount: createReimbursementActions.updateAmount,
  updateDescription: createReimbursementActions.updateDescription,
  updateError: createReimbursementActions.updateError,
  updateType: createReimbursementActions.updateType
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReimbursementComponent);

