import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types';
import cx from 'classnames'
import dateFormat from 'dateformat'
import { withStyles } from '@material-ui/core/styles'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import { topicPrimaryStyle, topicSecondaryStyle, topicItemStyle } from './styles'
import { tabs } from '../../util/variable-define'

const Primary = ({ classes, topic }) => {
  const classNames = cx({
    [classes.tab]: true,
    [classes.top]: topic.top,
  })
  return (
    <div className={classes.root}>
      <span className={classNames}>{ topic.top ? '置顶' : (topic.good ? '精华' : tabs[topic.tab]) }</span>
      <span className={classes.title}>{topic.title}</span>
    </div>
  )
}
const StyledPrimary = withStyles(topicPrimaryStyle)(Primary)

Primary.propTypes = {
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

Secondary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const TopicListItem = ({
  onClick, onSecondClick, topic, classes,
}) => (
  <ListItem button className={classes.root}>
    <ListItemSecondaryAction onClick={onSecondClick} style={{ left: 10, right: '100%' }}>
      <Avatar src={topic.author.avatar_url} />
    </ListItemSecondaryAction>
    <ListItemText onClick={onClick} style={{ marginLeft: 40 }}>
      <div>
        <StyledPrimary topic={topic} />
        <StyledSecondary topic={topic} />
      </div>
    </ListItemText >
  </ListItem>
)

export default withStyles(topicItemStyle)(TopicListItem)

TopicListItem.propTypes = {
  topic: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  onSecondClick: PropTypes.func.isRequired,
}
