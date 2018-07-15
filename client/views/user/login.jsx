import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import queryString from 'query-string'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import UserWrapper from './user'
import loginStyles from './styles/login-style'

@inject(stores => (
  {
    appState: stores.appState,
    user: stores.appState.user,
    currentPath: stores.appState.currentPath,
  }
))
@observer
class UserLogin extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      accesstoken: '',
      helpText: '',
      error: false,
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  getFrom(location) {
    const l = location || this.props.location
    const query = queryString.parse(l.search)
    return query.from || `/user/${this.props.user.info.loginname}`
  }

  handleLogin() {
    if (!this.state.accesstoken) {
      this.setState({
        helpText: '必须填写',
        error: true,
      })
      return
    }

    this.props.appState.login(this.state.accesstoken)
      .then(() => {
        this.setState({
          helpText: '',
          error: false,
        }, () => {
          const from = this.getFrom()
          this.props.history.push(from)
          this.props.appState.setCurrentPath(from)
        })
        return true
      })
      .catch((error) => {
        this.setState({
          helpText: error,
          error: true,
        })
      })
  }

  handleInput(event) {
    this.setState({
      accesstoken: event.target.value.trim(),
    })
  }

  render() {
    const { classes } = this.props
    return (
      <UserWrapper>
        <div className={classes.root}>
          <TextField
            label="请输入Cnode AccessToken"
            placeholder="请输入Cnode AccessToken"
            required
            helperText={this.state.helpText}
            value={this.state.accesstoken}
            onChange={this.handleInput}
            className={classes.input}
            error={this.state.error}
          />
          <Button
            variant="raised"
            color="primary"
            onClick={this.handleLogin}
            className={classes.loginButton}
          >
            登 录
          </Button>
        </div>
      </UserWrapper>
    )
  }
}

UserLogin.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

UserLogin.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withStyles(loginStyles)(UserLogin)
