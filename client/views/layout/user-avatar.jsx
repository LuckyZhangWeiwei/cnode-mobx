import React from 'react'
import { inject, observer } from 'mobx-react'
import { Avatar } from '@material-ui/core'
import UserIcon from '@material-ui/icons/AccountCircle'
import { withRouter } from 'react-router-dom'

@inject(stores => (
  {
    user: stores.appState.user,
  }
))
@observer
class UserAvatar extends React.Component {
  render() {
    const { info, isLogin } = this.props.user
    return (
      <div onClick={this.props.onClick} onKeyDown={this.props.onClick} role="form">
        {
          isLogin ?
            <Avatar src={info.avatar_url} />
          :
            <Avatar >
              <UserIcon />
            </Avatar>
        }
      </div>
    )
  }
}

export default withRouter(UserAvatar)
