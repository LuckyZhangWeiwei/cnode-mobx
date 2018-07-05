import React from 'react'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import {
  inject,
  observer,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Media from 'react-media'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import TopicCreate from '../views/topic-create/index'
import AppBar from './../views/layout/app-bar'
import DrawerBar from '../views/layout/drawer-bar'
import UserLogin from '../views/user/login'
import UserInfo from '../views/user/info'

const PrivateRoute = ({
  isLogin, appState, component: Component, ...rest
}) => (
  <Route
    {...rest}
    render={
        (props) => {
          if (!isLogin) {
            appState.setCurrentPath('/user/login')
          }

           return (isLogin ? <Component {...props} /> :
           <Redirect
             to={{
                pathname: '/user/login',
                search: `?from=${rest.path}`,
              }}
           />)
           }
      }
  />
)

const InjectedPrivateRoute = withRouter(inject(({ appState }) => (
  {
    isLogin: appState.user.isLogin,
    appState,
  }
))(observer(PrivateRoute)))

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  isLogin: PropTypes.bool,
  appState: PropTypes.object.isRequired,
}

PrivateRoute.defaultProps = {
  isLogin: false,
}

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
          <Route path="/detail/:id" exact component={TopicDetail} key="2" />
          <Route path="/index/:category" exact component={TopicList} key="3" />
          <InjectedPrivateRoute path="/topic/create" component={TopicCreate} key="4" />
          <Route path="/user/login" exact component={UserLogin} key="5" />
          <InjectedPrivateRoute path="/user/info" component={UserInfo} key="6" />
        </Switch>
      </div>
    )
  }
}

export default Routers
