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

  @action doReply(replyContent) {
    return new Promise((resolve, reject) => {
      post(`/topic/${this.id}/replies?needAccessToken=true`, {
        replyContent,
      }).then((resp) => {
        if (resp.success) {
          this.createdReplies.push(createReply({
            id: resp.reply_id,
            content: replyContent,
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

  constructor({
    syncing = false, topics = [], tab = null, details = [],
  } = {}) {
    this.syncing = syncing
    this.topics = topics.map(topic => (new Topic(createTopic(topic))))
    this.details = details.map(detail => new Topic(createTopic(detail)))
    this.tab = tab
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
            resolve()
          } else {
            reject()
          }
          this.syncing = false
        }).catch((err) => {
          reject(err)
          this.syncing = false
        })
      }
    })
  }

  @action getTopicDetail(id) {
    return new Promise((resolve, reject) => {
      if (this.detailMap[id]) {
        resolve(this.detailMap[id])
      } else {
        get(`/topic/${id}`, {
          mdrender: false,
        }).then((resp) => {
          if (resp.success) {
            const topic = new Topic(createTopic(resp.data))
            this.details.push(topic)
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
