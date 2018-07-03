import React from 'react'
import { withRouter } from 'react-router-dom'
import Contianer from '../layout/container'

class UserInfo extends React.Component {
  componentDidMount() {
    // do
  }
  render() {
    return (
      <Contianer>UserInfo</Contianer>
    )
  }
}

export default withRouter(UserInfo)
