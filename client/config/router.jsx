import React from 'react'
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import AppBar from './../views/layout/app-bar'

class Routers extends React.PureComponent {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" render={() => <Redirect to="/index/all" />} exact key="first" />
          <Route path="/detail" component={TopicDetail} key="detail" />
          <Route path="/index/:category" component={TopicList} key="index" />
        </Switch>
        <Route component={AppBar} key="AppBar" />
      </div>
    )
  }
}

export default withRouter(Routers)
