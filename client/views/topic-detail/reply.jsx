import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'
import marked from 'marked'
import dateFormat from 'dateformat'
import cx from 'classnames'
import { inject, observer } from 'mobx-react'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import { withStyles } from '@material-ui/core/styles'
import Create from '@material-ui/icons/Create'
import ThumbUp from '@material-ui/icons/ThumbUp'
import SimpleMDE from 'react-simplemde-editor'
import IconReply from '@material-ui/icons/Reply'
import { replyStyle } from './styles'

@inject(stores => (
  {
    appState: stores.appState,
    topicStore: stores.topicStore,
    currentPath: stores.appState.currentPath,
  }
))
@observer
class Reply extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props) {
    super(props)
    const { is_uped: isUped, ups } = this.props.reply
    this.state = {
      isUpped: isUped,
      repliyCount: ups ? ups.length : 0,
      showReplyWindow: false,
      newReply: null,
    }
    this.personalReply = this.personalReply.bind(this)
    this.up = this.up.bind(this)
    this.handleNewReplyChange = this.handleNewReplyChange.bind(this)
    this.doReply = this.doReply.bind(this)
  }

  getTopicId() {
    return this.context.router.route.match.params.id
  }

  personalReply() {
    const { isLogin } = this.props.appState.user
    if (!isLogin) {
      this.context.router.history.push(`/user/login?from=${this.context.router.route.location.pathname}`)
      this.props.appState.setCurrentPath(`/user/login?from=${this.context.router.route.location.pathname}`)
      return
    }
    this.setState({
      showReplyWindow: !this.state.showReplyWindow,
    })
  }

  up() {
    const { isLogin } = this.props.appState.user
    if (!isLogin) {
      this.context.router.history.push(`/user/login?from=${this.context.router.route.location.pathname}`)
      this.props.appState.setCurrentPath(`/user/login?from=${this.context.router.route.location.pathname}`)
      return
    }
    const { id } = this.props.reply
    this.props.topicStore.handleUp(id)
      .then((resp) => {
        this.setState({
          isUpped: resp === 'up',
          repliyCount: resp === 'up' ? this.state.repliyCount + 1 : this.state.repliyCount - 1,
        })
      })
  }

  handleNewReplyChange(value) {
    this.setState({
      newReply: value,
    })
  }

  doReply() {
    const { isLogin } = this.props.appState.user
    if (!isLogin) {
      this.context.router.history.push(`/user/login?from=${this.context.router.route.location.pathname}`)
      this.props.appState.setCurrentPath(`/user/login?from=${this.context.router.route.location.pathname}`)
      return
    }
    const { id: replyId } = this.props.reply
    const id = this.getTopicId()
    const topic = this.props.topicStore.detailMap[id]
    const replyContent = this.state.newReply
    topic.doReply(replyContent, replyId)
      .then(() => {
        const createdReply = topic.createdReplies[topic.createdReplies.length - 1]
        const newReply = Object.assign({}, createdReply, {
          author: {
            avatar_url: this.props.appState.user.info.avatar_url
              ||
              this.props.appState.user.info.avatarUrl,
            loginname: this.props.appState.user.info.loginname,
          },
          isNew: true,
        })
        topic.replies = [newReply, ...topic.replies]
        this.setState({
          newReply: '',
          showReplyWindow: !this.state.showReplyWindow,
        })
      })
  }

  render() {
    const { classes } = this.props
    const classNames = cx({
      [classes.root]: true,
      [classes.coloranimate]: this.props.reply.isNew,
    })
    return (
      <div className={classNames}>
        <div className={classes.left}>
          <ListItemSecondaryAction onClick={this.props.onSecondClick} style={{ position: 'static', transform: 'translateY(50%)' }}>
            <Avatar src={this.props.reply.author.avatar_url || this.props.reply.author.avatarUrl} />
          </ListItemSecondaryAction>
        </div>

        <div className={classes.right}>
          <span>{`${this.props.reply.author.loginname} | ${dateFormat(this.props.reply.create_at, 'yy-mm-dd')}`}</span>
          <div
            dangerouslySetInnerHTML={{ __html: marked(this.props.reply.content) }}
            className={classes.replyContent}
          />
          {
            this.state.showReplyWindow ?
              <section className={classes.replyEditor}>
                <SimpleMDE
                  onChange={this.handleNewReplyChange}
                  value={`@${this.props.reply.author.loginname} `}
                  options={{
                      toolbar: false,
                      spellChecker: false,
                      autoFocus: true,
                   }}
                />
                <ListItemSecondaryAction variant="fab" color="secondary" onClick={this.doReply} className={classes.replyButton}>
                  <IconReply />
                </ListItemSecondaryAction>
              </section>
              :
              null
          }
        </div>
        <div className={classes.buttons}>
          <ListItemSecondaryAction style={{ paddingRight: 35 }} onClick={this.personalReply} >
            <Create className={classes.icon} />
          </ListItemSecondaryAction>
          <ListItemSecondaryAction onClick={this.up}>
            <ThumbUp className={classes.icon} style={this.state.isUpped ? { color: '#f50057' } : null} />
            {this.state.repliyCount ? <span style={this.state.isUpped ? { color: '#f50057' } : null}>{this.state.repliyCount}</span> : null}
          </ListItemSecondaryAction>

        </div>
      </div>
    )
  }
}

Reply.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
  topicStore: PropTypes.object.isRequired,
}

Reply.propTypes = {
  reply: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onSecondClick: PropTypes.func.isRequired,
}

export default withStyles(replyStyle)(Reply)
