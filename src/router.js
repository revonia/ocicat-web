import React from 'react';
import { Router, Route, IndexRoute} from 'dva/router';
import AC from './components/AuthenticatedComponent';
import IndexPage from './routes/IndexPage';
import MyPage from './routes/my/MyPage'
import Login from './routes/login/';
import SignUp from './routes/signup/';
import Home from './routes/home/';
import Logout from './components/Logout';
import MyHome from './routes/my/home/';
import MyAccount from './routes/my/account/';
import MyStatistics from './routes/my/statistics/';
import CallTheRoll from './routes/my/call/';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
        <Route path="/" component={IndexPage}>
          <IndexRoute component={Home}/>
          <Route path='login' component={Login}/>
          <Route path='signup' component={SignUp}/>
          <Route path='logout' component={Logout}/>
        </Route>
        <Route path='/my' component={AC(MyPage)}>
          <IndexRoute component={MyHome}/>
          {/*<Route path='course' component={MyHome}/>*/}
          <Route path='statistics' component={MyStatistics}/>
          {/*<Route path='absence' component={MyHome}/>*/}
          <Route path='account' component={MyAccount}/>
          <Route path='call' component={CallTheRoll}/>
        </Route>
    </Router>
  );
}

export default RouterConfig;
