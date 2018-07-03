import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import List from '@material-ui/core/List'
import { CircularProgress } from '@material-ui/core'
import Container from '../layout/container'
import TopicListItem from './list-item'
import TopicStore from './../../store/topic.store'

@inject(stores => (
  {
    appState: stores.appState,
    topicStore: stores.topicStore,
    selectedTab: stores.appState.selectedTab,
    currentPath: stores.appState.currentPath,
  }
))
@observer
export default class TopicList extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      limit: 15,
    }
    this.listItemClick = this.listItemClick.bind(this)
    this.onScroll = this.onScroll.bind(this)
  }

  componentDidMount() {
    this.props.topicStore.topics = []
    const tab = this.getTab()
    this.props.topicStore.fetchTopics({ tab, page: this.state.page, limit: this.state.limit })
    window.addEventListener('scroll', this.onScroll, false)
  }

  componentWillReceiveProps(nextProps) {
    const nextCategory = nextProps.match.params.category
    if (nextCategory !== this.props.match.params.category) {
      this.props.topicStore.topics = []
      this.props.topicStore.fetchTopics({
        tab: nextCategory,
        page: 1,
        limit: this.state.limit,
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false)
  }

  onScroll() {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 10)
      &&
      !this.props.topicStore.syncing
      &&
      this.props.topicStore.topics.length
    ) {
      const currentPage = this.state.page
      this.setState({
        page: currentPage + 1,
      })
      const tab = this.getTab()
      this.props.topicStore.fetchTopics({ tab, page: this.state.page, limit: this.state.limit })
    }
  }

  getTab() {
    const search = this.props.match.params.category || 'all'
    return search
  }

  bootstrap() {
    const tab = this.getTab()
    return this.props.topicStore.fetchTopics({
      tab, page: this.state.page, limit: this.state.limit,
    }).then(() => (
      true
    )).catch(() => (
      false
    ))
  }

  listItemClick(topic) {
    this.context.router.history.push(`/detail/${topic.id}`)
    this.props.appState.setCurrentPath(`/detail/${topic.id}`)
  }

  render() {
    const { topicStore } = this.props
    const topicList = topicStore.topics.slice()
    // const { createTopics } = topicStore
    const syncingTopics = topicStore.syncing
    const tab = this.getTab()
    // const { user } = this.props.appState
    return (
      <Container>
        <Helmet>
          <title>cnode</title>
          <meta name="description" content={`this is meta ${tab}`} />
        </Helmet>
        {/* {
          createTopics && createTopics.length > 0 ?
            <List>
              {
                createTopics.map((topic) => {
                  topic = Object.assign({}, topic, {
                    author: user.info,
                  })
                  return (
                    <TopicListItem
                      key={topic.id}
                      onClick={() => this.listItemClick(topic)}
                      topic={topic}
                    />
                )
              })
              }
            </List>
            :
            null
        } */}
        <List>
          {
            topicList.map(topic => (
              <TopicListItem
                key={topic.id}
                onClick={() => this.listItemClick(topic)}
                topic={topic}
              />
            ))
          }
        </List>
        {
          syncingTopics ? (<div style={{ display: 'flex', justifyContent: 'space-around', padding: '40px 0' }}><CircularProgress size={80} /></div>) : null
        }
      </Container>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  topicStore: PropTypes.instanceOf(TopicStore).isRequired,
  // appState: PropTypes.object.isRequired,
}
