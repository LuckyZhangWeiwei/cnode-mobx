import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'

@inject('appState') @observer
export default class TopicList extends React.Component {
  componentDidMount() {
    // do
  }

  bootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 2
        resolve(true)
      }, 1000)
    })
  }

  render() {
    return (
      <div>{this.props.appState.msg}</div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.object,
}
