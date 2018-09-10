import * as React from 'react';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Textarea from 'react-textarea-autosize';
import { CustomInput, FormGroup, Label, Card, CardBody } from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import Form from 'reactstrap/lib/Form';
import * as createReimbursementActions from '../../actions/reimbursement/create-reimbursement.actions';
import { Reimbursement } from '../../model/Reimbursement';
import { ICreateReimbursementState, IState } from '../../reducers';
import CardHeader from 'reactstrap/lib/CardHeader';

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
      <div className="container h-100">
        <div className="row h-75">
          <div className="mx-auto my-auto">
            <Card>
              <CardHeader className="text-white bg-dark">Reimbursement Request</CardHeader>
              <CardBody className="bg-light">
                {errorMessage &&
                  <div className="alert alert-danger" role="alert">
                    <span>{errorMessage}</span>
                  </div>
                }
                <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => (this.props.createReimbursement(e, this.props.reimbursement))}>
                  <FormGroup>
                    <Label for="inputAmount">Amount</Label>
                    <NumberFormat
                      autoFocus
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
                    <CustomInput onChange={(e: any) => this.props.updateType("Lodging")} defaultChecked={this.props.reimbursement.type === "Lodging"} type="radio" id="reimbursement-lodging" name="reimbursementType" label="Lodging" required />
                    <CustomInput onChange={(e: any) => this.props.updateType("Travel")} defaultChecked={this.props.reimbursement.type === "Travel"} type="radio" id="reimbursement-travel" name="reimbursementType" label="Travel" required />
                    <CustomInput onChange={(e: any) => this.props.updateType("Food")} defaultChecked={this.props.reimbursement.type === "Food"} type="radio" id="reimbursement-food" name="reimbursementType" label="Food" required />
                    <CustomInput onChange={(e: any) => this.props.updateType("Other")} defaultChecked={this.props.reimbursement.type === "Other"} type="radio" id="reimbursement-other" name="reimbursementType" label="Other" required />
                  </FormGroup>
                  <FormGroup required>
                    <Label for="input-description">Description</Label>
                    <Textarea
                      type="textarea"
                      onChange={(e: any) => this.props.updateDescription(e.target.value)}
                      value={reimbursement.description}
                      maxLength={250}
                      id="input-description"
                      className="form-control"
                      required />
                  </FormGroup>
                  <Button color="primary" className="btn btn-lg btn-block" type="submit">Submit</Button>
                </Form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
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

