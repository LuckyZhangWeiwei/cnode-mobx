import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const styles = {
  root: {
    margin: 5,
    marginTop: 80,
    padding: 5,
  },
}

class Container extends React.Component {
  render() {
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
Container.defaultProps = {
  children: [],
}

Container.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
}

export default withStyles(styles)(Container)
