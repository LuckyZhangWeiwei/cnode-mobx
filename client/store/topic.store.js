import {
  observable,
  toJS,
  computed,
  action,
  extendObservable,
} from 'mobx'
import { topicSchema, replySchema } from '../util/variable-define'
import { get, post } from '../util/http'

const createTopic = topic => (
  Object.assign({}, topicSchema, topic)
)

const createReply = reply => (
  Object.assign({}, replySchema, reply)
)

class Topic {
  constructor(data) {
    extendObservable(this, data)
  }

  @observable syncing=false
  @observable createdReplies = []

  @action doReply(content, reply_id = null) {
    return new Promise((resolve, reject) => {
      post(`/topic/${this.id}/replies?needAccessToken=true`, {
        content,
        reply_id,
      }).then((resp) => {
        if (resp.success) {
          this.createdReplies.push(createReply({
            id: resp.reply_id,
            content,
            reply_id,
            create_at: Date.now(),
          }))
          resolve()
        } else {
          reject(resp)
        }
      }).catch(reject)
    })
  }
}

class TopicStore {
  @observable topics = []
  @observable details
  @observable syncing = false
  @observable createTopics = []
  @observable tab
  @observable isTopicCollected = false

  constructor({
    syncing = false, topics = [], tab = null, details = [],
  } = {}, appState = {}) {
    this.syncing = syncing
    this.topics = topics.map(topic => (new Topic(createTopic(topic))))
    this.details = details.map(detail => new Topic(createTopic(detail)))
    this.tab = tab
    this.appState = appState
  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }

  @computed get detailMap() {
    return this.details.reduce((result, detail) => {
      const temp = result
      temp[detail.id] = detail
      return temp
    }, {})
  }

  @action fetchTopics({ tab, page, limit }) {
    return new Promise((resolve, reject) => {
      if (tab === this.tab && this.topics.length > 0) {
        resolve()
      } else {
        this.syncing = true
        get('/topics', {
          mdrender: false,
          tab,
          page,
          limit,
        }).then((resp) => {
          if (resp.success) {
            resp.data.forEach((topic) => {
              this.topics.push(new Topic(createTopic(topic)))
            })
            this.syncing = false
            resolve()
          } else {
            reject()
          }
        }).catch((err) => {
          reject(err)
          this.syncing = false
        })
      }
    })
  }

  @action getTopicDetail(id, isLogin = false) {
    return new Promise((resolve, reject) => {
      const url = isLogin ?
        `/topic/${id}/?needAccessToken=true`
        :
        `/topic/${id}/`
      if (this.detailMap[id]) {
        resolve(this.detailMap[id])
      } else {
        get(url, {
          mdrender: false,
        }).then((resp) => {
          if (resp.success) {
            const topic = new Topic(createTopic(resp.data))
            this.details.push(topic)
            this.isTopicCollected = topic.is_collect
            resolve(topic)
          } else {
            reject()
          }
        }).catch(reject)
      }
    })
  }

  @action createTopic(title, tab, content) {
    return new Promise((resolve, reject) => {
      post('/topics/?needAccessToken=true', {
        title, tab, content,
      }).then((resp) => {
        if (resp.success) {
          const topic = {
            title,
            tab,
            content,
            id: resp.topic_id,
            create_at: Date.now(),
          }
          this.createTopics.push(new Topic(createTopic(topic)))
          resolve()
        } else {
          reject()
        }
      }).catch(reject)
    })
  }

  @action handleTopicCollection(operType, topicId) {
    // console.log('this.appState:', this.appState.user.isLogin)
    const url = operType ?
      '/topic_collect/de_collect/?needAccessToken=true'
      :
      '/topic_collect/collect/?needAccessToken=true'
    return new Promise((resolve, reject) => {
      post(url, {
        topic_id: topicId,
      }).then((resp) => {
        if (resp.success) {
          if (operType) {
            this.isTopicCollected = false
          } else {
            this.isTopicCollected = true
          }
          resolve()
        } else {
          reject()
        }
      }).catch(reject)
    })
  }

  @action handleUp(replyId) {
    return new Promise((resolve, reject) => {
      post(`/reply/${replyId}/ups?needAccessToken=true`)
        .then((resp) => {
          if (resp.success) {
            resolve(resp.action)
          } else {
            reject()
          }
        }).catch(reject)
    })
  }

  toJson() {
    return {
      topics: toJS(this.topics),
      syncing: this.syncing,
      details: toJS(this.details),
      tab: this.tab,
    }
  }
}

export default TopicStore
