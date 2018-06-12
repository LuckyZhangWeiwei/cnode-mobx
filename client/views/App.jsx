import React from 'react'
import { Link } from 'react-router-dom'
import Routes from '../config/router'

export default class App extends React.Component {
  componentDidMount() {
    // do
  }
  render() {
    return [
      <div>
        <Link to="/">首页</Link>
        <Link to="/list">列表页</Link>
        <Link to="/detail">详情页</Link>
      </div>,
      <Routes />,
    ]
  }
}
