import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import Helmet from 'react-helmet'
import { inject, observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import { CircularProgress, Button } from '@material-ui/core';
import dateFormat from 'dateformat'
import SimpleMDE from 'react-simplemde-editor'
import Container from '../layout/container'
import { topicDetailStyle } from './styles'
import Reply from './reply'
import TopicStore from '../../store/topic.store'

@inject(stores => (
  {
    topicStore: stores.topicStore,
    user: stores.appState.user,
  }
))
@observer
class TopicDetail extends React.Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     newReply: '',
  //   }

  //   this.handleNewReplyChange = this.handleNewReplyChange.bind(this)

  //   this.goToLogin = this.goToLogin.bind(this)

  //   this.doReply = this.doReply.bind(this)
  // }
  componentDidMount() {
    const id = this.getTopicId()

    this.props.topicStore.getTopicDetail(id)
  }

  getTopicId() {
    return this.props.match.params.id
  }

  // handleNewReplyChange() {
  // // do
  // }

  // goToLogin() {
  // // do
  // }

  // doReply() {
  // // do
  // }

  render() {
    const id = this.getTopicId()
    const topic = this.props.topicStore.detailMap[id]
    const { classes, user } = this.props
    if (!topic) {
      return (
        <Container>
          <section className={classes.loadingContainer}>
            <CircularProgress color="accent" />
          </section>
        </Container>
      )
    }
    return (
      <div style={{ overflow: 'hidden' }}>
        <Container>
          <Helmet>
            <title>
              {topic.title}
            </title>
          </Helmet>
          <header className={classes.header}>
            <h3>{topic.title}</h3>
          </header>
          <section>
            <p dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
          </section>
        </Container>
        <Container style={{ marginTop: 0 }}>
          {
            user.isLogin ?
              <section className={classes.replyEditor}>
                <SimpleMDE
                  onChange={this.handleNewReplyChange}
                  value={this.state.newReply}
                  options={{
                    toolbar: false,
                    autoFocus: false,
                    spellChecker: false,
                    placeholder: '添加回复',
                  }}
                />
                <Button fab color="primary" onClick={this.doReply} className={classes.replyButton}>回复</Button>
              </section>
            :
            null
          }
          {
            !user.isLogin &&
            <section className={classes.notLoginButton}>
              <Button color="accent" onClick={this.goToLogin}>登录后回复</Button>
            </section>
          }
        </Container>
        <Container style={{ marginTop: 0 }}>
          <header className={classes.replyHeader}>
            <span>{`${topic.reply_count} 回复`}</span>
            <span>{`最新回复 ${dateFormat(topic.last_reply_at, 'yy-mm-dd')}`}</span>
          </header>
          <section>
            {
              topic.replies.map(reply => <Reply reply={reply} key={reply.id} />)
            }
          </section>
        </Container>
      </div>
    )
  }
}

TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.instanceOf(TopicStore).isRequired,
  user: PropTypes.object.isRequired,
}

TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(topicDetailStyle)(TopicDetail)
