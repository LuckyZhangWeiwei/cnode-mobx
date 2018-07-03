import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { tabs } from '../../util/variable-define'
import UserAvatar from '../layout/user-avatar'

const styles = {
  root: {
    width: '100%',
    marginLeft: 24,
    marginRight: 24,
    overflow: 'hidden',
    display: 'block',
  },
  flex: {
    flex: 1,
  },
}

@inject(stores => (
  {
    user: stores.appState.user,
    scrollUp: stores.appState.scrollUp,
    appState: stores.appState,
    topicStore: stores.topicStore,
    currentPath: stores.appState.currentPath,
  }
))
@observer
class MainAppBar extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.onHomeIconClick = this.onHomeIconClick.bind(this)
    this.createButtonClick = this.createButtonClick.bind(this)
    this.loginButtonClick = this.loginButtonClick.bind(this)
    this.goUserInfo = this.goUserInfo.bind(this)
    this.changeTab = this.changeTab.bind(this)
  }

  onHomeIconClick() {
    const { appState } = this.props
    this.context.router.history.push('/index/all')
    appState.setSelectedTab('all')
    this.props.appState.setCurrentPath('/index/all')
  }

  getTab() {
    return this.props.appState.selectedTab || 'all'
  }

  changeTab(e, value) {
    e.preventDefault()
    this.context.router.history.push(`/index/${value}`)
    this.props.appState.setSelectedTab(value)
  }

  createButtonClick() {
    this.context.router.history.push('/topic/create')
    this.props.appState.setCurrentPath('/topic/create')
  }

  goUserInfo() {
    this.context.router.history.push('/user/info')
    this.props.appState.setCurrentPath('/user/info')
  }

  loginButtonClick() {
    if (this.props.user.isLogin) {
      this.context.router.history.push('/user/info')
      this.props.appState.setCurrentPath('/user/info')
    } else {
      this.context.router.history.push('/user/login')
      this.props.appState.setCurrentPath('/user/login')
    }
  }

  render() {
    const { classes, user } = this.props
    const tab = this.getTab()
    return (
      <div className={classes.root}>
        <AppBar position="fixed" style={{ overflow: 'hidden', height: 65 }}>
          <Toolbar style={{
             height: 0, overflow: 'hidden', minHeight: this.props.scrollUp ? 65 : 0, transition: 'all 0.4s ease-in',
         }
         }>
            <IconButton color="inherit" aria-label="Menu" onClick={this.onHomeIconClick}>
              <HomeIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex} onClick={this.onHomeIconClick}>
              JNode
            </Typography>
            <Button variant="raised" color="secondary" onClick={this.createButtonClick} style={{ marginRight: 10 }}>新建话题</Button>
            {
              user.isLogin ?
                <UserAvatar onClick={this.loginButtonClick} />
                :
                <Button color="inherit" onClick={this.loginButtonClick}>登录</Button>
            }
          </Toolbar>
          <Tabs value={tab} onChange={this.changeTab} style={{ marginTop: 10 }}>
            {
              Object.keys(tabs).map(t => (<Tab key={t} label={tabs[t]} value={t} />))
            }
          </Tabs>
        </AppBar>
      </div>
    )
  }
}

MainAppBar.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
}

MainAppBar.propTypes = {
  appState: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  scrollUp: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainAppBar)
