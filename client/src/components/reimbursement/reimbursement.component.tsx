import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';

class ReimbursementComponent extends React.Component<any, {}> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {state.reimbursement}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ReimbursementComponent);
