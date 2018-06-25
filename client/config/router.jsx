import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'

export default () => [
  <Route path="/" render={() => <Redirect to="/index/all" />} exact key="first" />,
  <Route path="/detail" component={TopicDetail} key="detail" />,
  <Route path="/index/:category" component={TopicList} key="index" />,
]
