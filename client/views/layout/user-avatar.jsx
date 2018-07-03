import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Avatar } from '@material-ui/core'
import UserIcon from '@material-ui/icons/AccountCircle'

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
      <div onClick={this.props.onClick} onKeyDown={this.props.onClick} role="button" tabIndex="0">
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

UserAvatar.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default UserAvatar
