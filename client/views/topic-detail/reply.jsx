import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'
import marked from 'marked'
import dateFormat from 'dateformat'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import { withStyles } from '@material-ui/core/styles'
import { replyStyle } from './styles'

const Reply = ({ reply, classes, onSecondClick }) => (
  <div className={classes.root}>
    <div className={classes.left}>
      <ListItemSecondaryAction onClick={onSecondClick} style={{ position: 'static', transform: 'translateY(50%)' }}>
        <Avatar src={reply.author.avatar_url} />
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

Reply.propTypes = {
  reply: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onSecondClick: PropTypes.func.isRequired,
}

export default withStyles(replyStyle)(Reply)
