import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Routes from '../config/router'

let scrollTopValue

@inject(stores => ({
  appState: stores.appState,
}
))
@observer
class App extends React.Component {
  constructor(props) {
    super(props)
    this.onScroll = this.onScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false)
  }

  onScroll() {
    const thisScrollTop = document.scrollingElement.scrollTop
    if (scrollTopValue === undefined) {
      scrollTopValue = thisScrollTop
      return
    }
    if (thisScrollTop > scrollTopValue) {
      this.props.appState.setScrollDirectionFlag(false)
    } else if (thisScrollTop < scrollTopValue) {
      this.props.appState.setScrollDirectionFlag(true)
    }
    scrollTopValue = thisScrollTop
  }

  render() {
    return [
      <Routes key="routes" />,
    ]
  }
}

App.propTypes = {
  appState: PropTypes.object.isRequired,
}

export default App
