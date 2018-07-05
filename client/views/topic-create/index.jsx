import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button'
import IconReply from '@material-ui/icons/Reply'
import Snackbar from '@material-ui/core/Snackbar'
import SimpleMDE from 'react-simplemde-editor'
import { withStyles } from '@material-ui/core/styles'
import Container from '../layout/container'
import createStyles from './styles'
import { tabs } from '../../util/variable-define'


@inject(stores => (
  {
    appState: stores.appState,
    topicStore: stores.topicStore,
    currentPath: stores.appState.currentPath,
  }
))
@observer
class TopicCreate extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super()
    this.state = {
      title: '',
      content: '',
      tab: 'dev',
      open: false,
      message: '',
    }
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleChangeTab = this.handleChangeTab.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value,
    })
  }

  handleContentChange(value) {
    this.setState({
      content: value,
    })
  }

  handleChangeTab(e) {
    this.setState({
      tab: e.currentTarget.value,
    })
  }

  handleCreate() {
    const {
      tab, title, content,
    } = this.state
    if (!title) {
      this.showMessage('标题必须填写')
      return
    }
    if (!content) {
      this.showMessage('内容不能为空')
      return
    }

    this.props.topicStore.createTopic(title, tab, content)
      .catch((err) => {
        this.showMessage(err.message)
      })
    this.context.router.history.push('/index/all')
    this.props.appState.setCurrentPath('/index/all')
  }

  showMessage(message) {
    this.setState({
      open: true,
      message,
    })
  }

  handleClose() {
    this.setState({
      open: false,
    })
  }

  render() {
    const { classes } = this.props
    const { message, open } = this.state
    return (
      <Container>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          message={message}
          open={open}
          onRequestClose={this.handleClose}
        />
        <div className={classes.root}>
          <TextField
            className={classes.title}
            label="标题"
            value={this.state.title}
            onChange={this.handleTitleChange}
            fullWidth
          />
          <section className={classes.replyEditor}>
            <SimpleMDE
              onChange={this.handleContentChange}
              value={this.state.content}
              options={{
                // toolbar: false,
                // autoFocus: false,
                // spellChecker: false,
                placeholder: '发表你的精彩意见',
              }}
            />
            <Button variant="fab" color="secondary" onClick={this.handleCreate} className={classes.replyButton}>
              <IconReply />
            </Button>
          </section>
          <div>
            {
              Object.keys(tabs).map((tab) => {
                if (tab !== 'all' && tab !== 'good') {
                  return (
                    <span className={classes.selectItem} key={tab}>
                      <Radio
                        value={tab}
                        checked={tab === this.state.tab}
                        onChange={this.handleChangeTab}
                      />
                      {tabs[tab]}
                    </span>
                  )
                }
                return null
              })
            }
          </div>
        </div>
      </Container>
    )
  }
}

TopicCreate.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
}

TopicCreate.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(createStyles)(TopicCreate)
