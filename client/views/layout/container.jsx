import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'


const styles = {
  root: {
    margin: 24,
    marginTop: 80,
  },
}

class Container extends React.Component {
  render() {
    // const marginTop = this.props.style ? this.props.style.marginTop : null
    return (
      <Paper
        elevation={4}
        className={this.props.classes.root}
        {...this.props}
      >
        {this.props.children}
      </Paper>
    )
  }
}

Container.protoTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
}

export default withStyles(styles)(Container)
