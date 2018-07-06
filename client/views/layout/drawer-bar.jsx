import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import MenuIcon from '@material-ui/icons/Menu'
import ReplyIcon from '@material-ui/icons/KeyboardBackspace'
import DrawerMenu from './drawer'

const drawerWidth = 200;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: 70,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  AddButton: {
    marginLeft: '30%',
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
});

@inject(stores => (
  {
    appState: stores.appState,
    currentPath: stores.appState.currentPath,
  }
))
@observer
class DrawerBar extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      previousPath: '',
    }
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
    this.goToCreateTopic = this.goToCreateTopic.bind(this)
    this.goback = this.goback.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps:', nextProps)
    // this.props.appState.setCurrentPath(Math.random().toString())
    if (this.props.location !== nextProps.location) {
      this.setState({
        previousPath: this.props.location.pathname,
      })
    }
  }

  handleDrawerOpen() {
    this.setState({ open: true })
  }

  handleDrawerClose() {
    this.setState({ open: false })
  }

  goToCreateTopic() {
    this.context.router.history.push('/topic/create')
    this.props.appState.setCurrentPath('/topic/create')
  }

  goback() {
    // console.log('this.context.router:', this.props.currentPath)
    // this.props.history.goBack()
    // const preLink = this.props.location.pathname
    // // console.log('preLink:', preLink)
    // this.context.router.history.replace(preLink)
    // this.props.appState.setCurrentPath(preLink)
    if (this.state.previousPath) {
      this.context.router.history.replace(this.state.previousPath)
      this.props.appState.setCurrentPath(this.state.previousPath)
    }
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div>
        <AppBar position="fixed">
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              CNode
            </Typography>
            <IconButton
              color="inherit"
              className={classes.AddButton}
              aria-label="button"
              onClick={this.goToCreateTopic}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="button"
              onClick={this.goback}
            >
              <ReplyIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DrawerMenu isOpen={this.state.open} onClose={this.handleDrawerClose} />
      </div>
    )
  }
}

DrawerBar.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
}
DrawerBar.propTypes = {
  // currentPath: PropTypes.object.isRequired,
  // history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(DrawerBar)
