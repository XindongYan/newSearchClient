import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Search from './routes/Search';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/search" exact component={Search} />
        <Route path="/" exact component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
