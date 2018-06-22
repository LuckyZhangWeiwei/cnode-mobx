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

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
}

@inject((stores) => {
  return {
    user: stores.appState.user,
  }
})
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
  }

  onHomeIconClick() {
    this.context.router.history.push('/index?tab=all')
  }

  createButtonClick() {
    this.context.router.history.push('/topic/create')
  }

  loginButtonClick() {
    if (this.props.user.isLogin) {
      this.context.router.history.push('/user/info')
    } else {
      this.context.router.history.push('/user/login')
    }
  }

  goUserInfo() {
    this.context.router.history.push('/user/info')
  }

  render() {
    const { classes, user } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu" onClick={this.onHomeIconClick}>
              <HomeIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              JNode
            </Typography>
            <Button variant="raised" color="secondary" onClick={this.createButtonClick}>新建话题</Button>
            {
              user.isLogin ?
                <Button variant="raised" color="secondary" onClick={this.goUserInfo}>{user.info.loginname}</Button> :
                <Button color="inherit" onClick={this.loginButtonClick}>登录</Button>
            }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

MainAppBar.wrappedComponent.protoTypes = {
  appState: PropTypes.object.isRequired,
}

MainAppBar.protoTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainAppBar)
