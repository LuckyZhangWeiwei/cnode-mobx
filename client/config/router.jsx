import React from 'react'
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import Media from 'react-media'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import TopicCreate from '../views/topic-create/index'
import AppBar from './../views/layout/app-bar'
import DrawerBar from '../views/layout/drawer-bar'
import UserLogin from '../views/user/login'
import UserInfo from '../views/user/info'

class Routers extends React.PureComponent {
  render() {
    return (
      <div>
        <Media query="(max-width: 375px)">
          {matches => matches ?
            <Route component={DrawerBar} key="AppBar" />
              :
            <Route component={AppBar} key="AppBar" />
          }
        </Media>
        <Switch>
          <Route path="/" render={() => <Redirect to="/index/all" />} exact key="1" />
          <Route path="/detail/:id" component={TopicDetail} key="2" />
          <Route path="/index/:category" component={TopicList} key="3" />
          <Route path="/topic/create" component={TopicCreate} key="4" />
          <Route path="/user/login" exact component={UserLogin} key="5" />
          <Route path="/user/info" component={UserInfo} key="6" />
        </Switch>
      </div>
    )
  }
}

export default withRouter(Routers)
