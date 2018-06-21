import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

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
      <div>
        <Helmet>
          <title>this is topic list</title>
          <meta name="description" content="this is description" />
        </Helmet>
        {this.props.appState.msg}
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.object,
}
