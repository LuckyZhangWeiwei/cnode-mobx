import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import userStyles from './styles/user-style'
import Container from '../layout/container'
import UserAvatar from '../layout/user-avatar'

@inject(stores => (
  {
    user: stores.appState.user,
  }
))
@observer
class User extends React.Component {
  render() {
    const { classes } = this.props
    const { info, isLogin } = this.props.user
    return (
      <Container>
        <div className={classes.avatar}>
          <div className={classes.bg}>
            <UserAvatar className={classes.avatarImg} />
            <span className={classes.userName}>{isLogin ? info.loginname : '未登录'}</span>
          </div>
        </div>
        {this.props.children}
      </Container>
    )
  }
}

User.wrappedComponent.propTypes = {
  user: PropTypes.object.isRequired,
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
}

export default withStyles(userStyles)(User)
