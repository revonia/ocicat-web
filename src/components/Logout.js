/**
 * Created by SiriusWangs on 2017/4/1.
 */
import React from 'react';
import {connect} from "dva";

class Logout extends React.Component {
  componentWillMount() {
    this.props.dispatch({
      type: 'me/logout',
    });
    this.props.dispatch({
      type: 'app/jumpTo',
      payload: {
        pathname: '/login',
      }
    });
  }

  render = () => (
    <div>
      正在注销
    </div>
  )
}


Logout.propTypes = {
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(Logout);
