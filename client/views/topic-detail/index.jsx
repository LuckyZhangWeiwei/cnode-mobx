import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import Helmet from 'react-helmet'
import { inject, observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import { CircularProgress, Button } from '@material-ui/core'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import dateFormat from 'dateformat'
import SimpleMDE from 'react-simplemde-editor'
import IconReply from '@material-ui/icons/Reply'
import Container from '../layout/container'
import { topicDetailStyle } from './styles'
import Reply from './reply'
import TopicStore from '../../store/topic.store'


@inject(stores => (
  {
    appState: stores.appState,
    topicStore: stores.topicStore,
    user: stores.appState.user,
    currentPath: stores.appState.currentPath,
  }
))
@observer
class TopicDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newReply: '',
      showScrollBtn: false,
    }

    this.handleNewReplyChange = this.handleNewReplyChange.bind(this)

    this.goToLogin = this.goToLogin.bind(this)

    this.doReply = this.doReply.bind(this)

    this.onScroll = this.onScroll.bind(this)

    this.scrollTop = this.scrollTop.bind(this)
  }
  componentDidMount() {
    const id = this.getTopicId()

    this.props.topicStore.getTopicDetail(id)

    window.addEventListener('scroll', this.onScroll, false)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false)
  }

  onScroll() {
    if (
      window.scrollY >= window.innerHeight - 50
    ) {
      this.setState({
        showScrollBtn: true,
      })
    } else {
      this.setState({
        showScrollBtn: false,
      })
    }
  }

  getTopicId() {
    return this.props.match.params.id
  }

  handleNewReplyChange(value) {
    this.setState({
      newReply: value,
    })
  }

  goToLogin() {
    this.props.history.push('/user/login')
    this.props.appState.setCurrentPath('/user/login')
  }

  doReply() {
    const id = this.getTopicId()
    const topic = this.props.topicStore.detailMap[id]
    topic.doReply(this.state.newReply)
      .then(() => {
        this.setState({
          newReply: '',
        })
      })
      // .catch((err) => {
      //   alert(err)
      // })
  }

  scrollTop() {
    document.documentElement.scrollTop = 0
  }

  render() {
    const id = this.getTopicId()
    const topic = this.props.topicStore.detailMap[id]
    const { classes, user } = this.props
    if (!topic) {
      return (
        <Container>
          <section className={classes.loadingContainer}>
            <CircularProgress size={80} />
          </section>
        </Container>
      )
    }
    return (
      <div className={classes.containerBar}>
        <Container style={{ marginTop: 65 }}>
          <Helmet>
            <title>
              {topic.title}
            </title>
          </Helmet>
          <header className={classes.header}>
            <h3>{topic.title}</h3>
          </header>
          <section>
            <div
              className={classes.content}
              dangerouslySetInnerHTML={{ __html: marked(topic.content) }}
            />
          </section>
        </Container>
        {
          topic.createdReplies && topic.createdReplies.slice().length ?
            <Container style={{ marginTop: 10 }}>
              <header className={classes.replyHeader}>
                <span>我的最新回复</span>
                <span>{`${topic.createdReplies.slice().length}条`}</span>
              </header>
              {
              topic.createdReplies.map(reply => (
                <Reply
                  reply={Object.assign({}, reply, {
                  author: {
                    avatar_url: user.info.avatar_url,
                    loginname: user.info.loginname,
                  },
                })}
                  key={reply.id}
                />
              ))
            }
            </Container>
          :
          null
        }
        <Container
          style={{
             marginTop: 0, paddingLeft: 0, paddingRight: 0, margin: 0,
            }}
          className={classes.replies}
        >
          <header className={classes.replyHeader}>
            <span>{`${topic.reply_count} 回复`}</span>
            <span>{`最新回复 ${dateFormat(topic.last_reply_at, 'yy-mm-dd')}`}</span>
          </header>
          {
            user.isLogin ?
              <section className={classes.replyEditor}>
                <SimpleMDE
                  onChange={this.handleNewReplyChange}
                  value={this.state.newReply}
                  options={{
                    // toolbar: false,
                    // autoFocus: false,
                    // spellChecker: false,
                    placeholder: '添加回复',
                  }}
                />
                <Button variant="fab" color="secondary" onClick={this.doReply} className={classes.replyButton}>
                  <IconReply />
                </Button>
              </section>
            :
            null
          }
          {
            !user.isLogin &&
            <section className={classes.notLoginButtonSection}>
              <Button variant="raised" color="secondary" className={classes.LoginBtn} onClick={this.goToLogin}>登录后回复</Button>
            </section>
          }
        </Container>
        {
          topic.replies.slice().length > 0 ?
            <Container style={{ marginTop: 10 }}>
              <section>
                {
                  topic.replies.map(reply => <Reply reply={reply} key={reply.id} />)
                }
              </section>
            </Container>
          :
          null
        }
        {
          this.state.showScrollBtn &&
            <Button
              variant="fab"
              color="primary"
              aria-label="add"
              style={{
                 position: 'fixed', bottom: 10, right: 15, zIndex: 1000,
                 }}
              onClick={this.scrollTop}
            >
              <KeyboardArrowUp />
            </Button>
        }

      </div>
    )
  }
}

TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.instanceOf(TopicStore).isRequired,
  user: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
}

TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withStyles(topicDetailStyle)(TopicDetail)
