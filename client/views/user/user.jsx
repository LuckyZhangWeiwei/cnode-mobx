import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import { Avatar, withStyles } from '@material-ui/core'
import UserIcon from '@material-ui/icons/AccountCircle'
import userStyles from './styles/user-style'
import Container from '../layout/container'

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
            {
              info.avatar_url ?
                <Avatar className={classes.avatarImg} src={info.avatar_url} /> :
                <Avatar className={classes.avatarImg}>
                  <UserIcon />
                </Avatar>
            }
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
