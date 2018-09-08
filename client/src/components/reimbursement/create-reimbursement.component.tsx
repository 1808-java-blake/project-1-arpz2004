import * as React from 'react';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { CustomInput, FormGroup, Input, Label } from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import Form from 'reactstrap/lib/Form';
import * as createReimbursementActions from '../../actions/reimbursement/create-reimbursement.actions';
import { Reimbursement } from '../../model/Reimbursement';
import { ICreateReimbursementState, IState } from '../../reducers';

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
      <>
        <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => (this.props.createReimbursement(e, this.props.reimbursement))}>
          <FormGroup>
            <Label for="inputAmount">Amount</Label>
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
              isAllowed={(val) => +val.value <= 999999.99 && val.value.length <= 9}
              required />
          </FormGroup>
          <FormGroup required>
            <Label for="reimbursementType">Type</Label>
            <div>
              <CustomInput type="radio" id="reimbursement-lodging" name="reimbursementType" label="Lodging" required/>
              <CustomInput type="radio" id="reimbursement-travel" name="reimbursementType" label="Travel" required/>
              <CustomInput type="radio" id="reimbursement-food" name="reimbursementType" label="Food" required/>
              <CustomInput type="radio" id="reimbursement-other" name="reimbursementType" label="Other" required/>
            </div>
          </FormGroup>
          <FormGroup required>
            <Label for="inputDescription">Description</Label>
            <Input type="textarea"
              onChange={(e: any) => this.props.updateDescription(e.target.value)}
              value={reimbursement.description}
              maxLength={250}
              id="inputDescription"
              className="form-control"
              placeholder="Description"
              required />
          </FormGroup>
          <Button className="btn btn-lg btn-primary btn-block" type="submit">Submit</Button>
        </Form>
        {errorMessage && <p id="error-message">{errorMessage}</p>}
        {/* <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => (this.props.createReimbursement(e, this.props.reimbursement))}>

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
        </form> */}
      </>
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

