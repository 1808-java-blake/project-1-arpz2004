import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';

class ReimbursementComponent extends React.Component<any, {}> {

  constructor(props: any) {
    super(props);
  }

  public componentDidMount = () => {
    console.log(this.props)
  }

  public render() {
    const reimbursement = this.props.reimbursement;
    return (
      <tr>
        <th scope="row">{reimbursement.reimbursementId}</th>
        <td>{reimbursement.amount}</td>
        <td>{reimbursement.submitted}</td>
        <td>{reimbursement.description}</td>
        <td>{reimbursement.status}</td>
        <td>{reimbursement.type}</td>
      </tr>
    );
  }
}

const mapStateToProps = (state: IState) => state.reimbursement

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ReimbursementComponent);
