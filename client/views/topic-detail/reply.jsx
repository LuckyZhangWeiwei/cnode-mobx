import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'
import marked from 'marked'
import dateFormat from 'dateformat'
import cx from 'classnames'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import { withStyles } from '@material-ui/core/styles'
import { replyStyle } from './styles'

const Reply = ({ reply, classes, onSecondClick }) => {
  const classNames = cx({
    [classes.root]: true,
    [classes.coloranimate]: reply.isNew,
  })
  return (
    <div className={classNames}>
      <div className={classes.left}>
        <ListItemSecondaryAction onClick={onSecondClick} style={{ position: 'static', transform: 'translateY(50%)' }}>
          <Avatar src={reply.author.avatar_url || reply.author.avatarUrl} />
        </ListItemSecondaryAction>
      </div>

      <div className={classes.right}>
        <span>{`${reply.author.loginname} | ${dateFormat(reply.create_at, 'yy-mm-dd')}`}</span>
        <div
          dangerouslySetInnerHTML={{ __html: marked(reply.content) }}
          className={classes.replyContent}
        />
      </div>
    </div>
  )
}

Reply.propTypes = {
  reply: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onSecondClick: PropTypes.func.isRequired,
}

export default withStyles(replyStyle)(Reply)
