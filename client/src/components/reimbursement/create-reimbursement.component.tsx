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
  submit: (reimbursement: Reimbursement) => void
}

class CreateReimbursementComponent extends React.Component<IProps, {}> {

  constructor(props: any) {
    super(props);
  }


  public submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('http://localhost:9001/reimbursements', {
      body: JSON.stringify(this.props.reimbursement),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(resp => {
        if (resp.status === 200) {
          this.props.updateError('');
          return resp.json();
        } else {
          this.props.updateError('Failed submitting reimbursement request');
        }
        throw new Error('Failed creating reimbursement request');
      })
      .then(resp => {
        this.props.history.push('/reimbursements');
      })
      .catch(err => {
        console.log(err);
      });
  }
  public amountChange = (e: any) => {
    this.props.updateAmount(e.target.value);
  }

  public descriptionChange = (e: any) => {
    this.props.updateDescription(e.target.value);
  }

  public typeChange = (e: any) => {
    this.props.updateType(e.target.value);
  }

  public render() {
    const { errorMessage, reimbursement } = this.props;

    return (
      <form onSubmit={this.submit}>
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
            value={reimbursement.amount}
            id="inputAmount"
            className="form-control"
            placeholder="Amount"
            isAllowed={(val) => +val.value <= 999999.99 && val.value.length <= 9}
            required />
        </div>

        <label htmlFor="inputDescription" className="sr-only">Description</label>
        <textarea
          onChange={this.descriptionChange}
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
            onChange={this.typeChange}>
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
  updateAmount: createReimbursementActions.updateAmount,
  updateDescription: createReimbursementActions.updateDescription,
  updateError: createReimbursementActions.updateError,
  updateType: createReimbursementActions.updateType
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReimbursementComponent);

