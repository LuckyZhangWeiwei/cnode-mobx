import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { tabs } from '../../util/variable-define'
import UserAvatar from '../layout/user-avatar'

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    // width: 'auto',
  },
};

@inject(stores => (
  {
    user: stores.appState.user,
    appState: stores.appState,
    currentPath: stores.appState.currentPath,
  }
))
@observer
class DrawerMenu extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  constructor(props) {
    super(props)
    this.goTo = this.goTo.bind(this)
  }
  changeTab(value) {
    this.context.router.history.push(`/index/${value}`)
  }

  goTo() {
    if (this.props.user.isLogin) {
      this.context.router.history.push('/user/info')
      this.props.appState.setCurrentPath('/user/info')
    } else {
      this.context.router.history.push('/user/login')
      this.props.appState.setCurrentPath('/user/login')
    }
  }

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem>
            <UserAvatar onClick={this.goTo} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {
            Object.keys(tabs).map(t => (
              <ListItem button key={t} onClick={() => this.changeTab(t)}>
                <ListItemText primary={tabs[t]} />
              </ListItem>
          ))
          }
        </List>
      </div>
    );

    return (
      <div>
        <Drawer open={this.props.isOpen} onClose={this.props.onClose}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.props.onClose}
            onKeyDown={this.props.onClose}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    )
  }
}

DrawerMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.bool.isRequired,
  user: PropTypes.bool.isRequired,
  appState: PropTypes.bool.isRequired,
};

export default withStyles(styles)(DrawerMenu);
