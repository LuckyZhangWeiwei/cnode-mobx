import React from 'react'
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import TopicCreate from '../views/topic-create/index'
import AppBar from './../views/layout/app-bar'

class Routers extends React.PureComponent {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" render={() => <Redirect to="/index/all" />} exact key="1" />
          <Route path="/detail/:id" component={TopicDetail} key="2" />
          <Route path="/index/:category" component={TopicList} key="3" />
          <Route path="/topic/create" component={TopicCreate} key="4" />
        </Switch>
        <Route component={AppBar} key="AppBar" />
      </div>
    )
  }
}

export default withRouter(Routers)
