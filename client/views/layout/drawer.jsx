/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { tabs } from '../../util/variable-define'

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    // width: 'auto',
  },
};

class DrawerMenu extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  changeTab(value) {
    console.log('value:', value)
    this.context.router.history.push(`/index/${value}`)
    this.props.appState.setSelectedTab(value)
  }

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {
            Object.keys(tabs).map(t => (
            <ListItem button key={t} onClick={() => this.changeTab(t)}>
              <ListItemText primary={tabs[t]} />
            </ListItem>
          ))
          }
        </List>
        <Divider />
        <List>
          <ListItem key="item-1">
            <ListItemText primary="item-1" />
          </ListItem>
          <ListItem key="item-2">
            <ListItemText primary="item-2" />
          </ListItem>
          <ListItem key="item-3">
            <ListItemText primary="item-3" />
          </ListItem>
          <ListItem key="item-4">
            <ListItemText primary="item-4" />
          </ListItem>
          <ListItem key="item-5">
            <ListItemText primary="item-5" />
          </ListItem>
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
};

export default withStyles(styles)(DrawerMenu);
/* eslint-enable */
