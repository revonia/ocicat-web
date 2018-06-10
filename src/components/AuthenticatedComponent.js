/**
 * Created by SiriusWangs on 2017/4/1.
 */

import React from 'react';
import { connect } from "dva";

const requireAuthentication = (Component) => {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }

    checkAuth() {
      if (!this.props.isAuthenticated) {
        let redirectAfterLogin = this.props.location.pathname;
        this.props.dispatch({
            type: 'app/jumpTo',
            payload: {
              pathname: '/login',
              query: {
                next: redirectAfterLogin,
              }
            },
          });
      }
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated === true
            ? <Component {...this.props}/>
            : null
          }
        </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    let isAuthenticated = false;
    if (state.me.user !== null && state.me.user !== undefined) {
      isAuthenticated = true;
    }
    return {
      user: state.me.user,
      isAuthenticated: isAuthenticated
    }
  };

  return connect(mapStateToProps)(AuthenticatedComponent);

};

export default requireAuthentication;
