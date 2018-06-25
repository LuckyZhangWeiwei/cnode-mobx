import React from 'react'
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types';
import cx from 'classnames'
import dateFormat from 'dateformat'
import { withStyles } from '@material-ui/core/styles'
import { topicPrimaryStyle, topicSecondaryStyle, topicItemStyle } from './styles';
import { tabs } from '../../util/variable-define'

const Primary = ({ classes, topic }) => {
  const classNames = cx({
    [classes.tab]: true,
    [classes.top]: topic.top,
  })
  return (
    <div className={classes.root}>
      <span className={classNames}>{topic.top ? '置顶' : tabs[topic.tab]}</span>
      <span className={classes.title}>{topic.title}</span>
    </div>
  )
}
const StyledPrimary = withStyles(topicPrimaryStyle)(Primary)

Primary.protoTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const Secondary = ({ classes, topic }) => (
  <div className={classes.root}>
    <span className={classes.userName}>{topic.author.loginname}</span>
    <span className={classes.count}>
      <span className={classes.count}>{topic.reply_count}</span>
      <span>/</span>
      <span className={classes.accentColor}>{topic.visit_count}</span>
    </span>
    <span>创建时间:{dateFormat(topic.create_at, 'yy年mm月dd日')}</span>
  </div>
)

const StyledSecondary = withStyles(topicSecondaryStyle)(Secondary)

Secondary.protoTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const TopicListItem = ({ onClick, topic, classes }) => (
  <ListItem button onClick={onClick} className={classes.root}>
    <ListItemAvatar>
      <Avatar src={topic.author.avatar_url} />
    </ListItemAvatar>
    <ListItemText
      primary={<StyledPrimary topic={topic} />}
      secondary={<StyledSecondary topic={topic} />}
    />
  </ListItem>
)

export default withStyles(topicItemStyle)(TopicListItem)

TopicListItem.protoTypes = {
  topic: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}
