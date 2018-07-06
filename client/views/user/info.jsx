import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import UserWrapper from './user'
import infoStyles from './styles/user-info-style'
import TopicListItem from './../topic-list/list-item'

@inject(stores => (
  {
    user: stores.appState.user,
    appState: stores.appState,
    currentPath: stores.appState.currentPath,
  }
))
@observer
class UserInfo extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    this.props.appState.getUserDetail()
    this.props.appState.getUserCollection()
  }

  gotoTopic(topic) {
    this.context.router.history.push(`/detail/${topic.id}`)
    this.props.appState.setCurrentPath(`/detail/${topic.id}`)
  }

  bootstrap() {
    return this.props.appState.getUserDetail().then(() => (
      this.props.appState.getUserCollection().then(() => (
        true
      ))
    ))
  }

  render() {
    const { classes } = this.props
    const topics = this.props.user.detail.recent_topics.slice()
    const replies = this.props.user.detail.recent_replies.slice()
    const collections = this.props.user.collections.list.slice()
    return (
      <UserWrapper>
        <div className={classes.root}>
          <Grid container spacing={16} align="stretch">
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>最近发布的话题</span>
                </Typography>
                <List>
                  {
                    topics.length > 0 ?
                      topics.map(topic => (
                        <TopicListItem
                          key={topic.id}
                          topic={topic}
                          onClick={() => this.gotoTopic(topic)}
                        />
                      ))
                      :
                      <Typography align="center">
                        最近没有发布过话题
                      </Typography>
                  }
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>新的回复</span>
                </Typography>
                <List>
                  {
                    replies.length > 0 ?
                      replies.map(topic => (
                        <TopicListItem
                          topic={topic}
                          key={topic.id}
                          onClick={() => this.gotoTopic(topic)}
                        />
                      ))
                      :
                      <Typography align="center">
                        最近没有新的回复
                      </Typography>
                  }
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>收藏的话题</span>
                </Typography>
                <List>
                  {
                    collections.length > 0 ?
                      collections.map(topic => (
                        <TopicListItem
                          topic={topic}
                          key={topic.id}
                          onClick={() => this.gotoTopic(topic)}
                        />
                    )) :
                      <Typography align="center">
                        还么有收藏话题哦
                      </Typography>
                  }
                </List>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </UserWrapper>
    )
  }
}

UserInfo.wrappedComponent.propTypes = {
  user: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
}

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  // currentPath: PropTypes.string.isRequired,
}

export default withStyles(infoStyles)(UserInfo)
