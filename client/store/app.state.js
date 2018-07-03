import { observable, action, toJS } from 'mobx'
import { post, get } from '../util/http'

export default class AppState {
  @observable scrollUp = true

  @observable selectedTab = 'all'

  @observable currentPath = ''

  @observable user = {
    isLogin: false,
    info: {},
    detail: {
      syncing: false,
      recent_topics: [],
      recent_replies: [],
    },
    collections: {
      syncing: false,
      list: [],
    },
  }

  init({ user }) {
    if (user) {
      this.user = user
    }
  }

  @action login(accessToken) {
    return new Promise((resolve, reject) => {
      post('/user/login', {
        accessToken,
      }).then((resp) => {
        if (resp.success) {
          this.user.info = resp.data
          this.user.isLogin = true
          resolve()
        } else {
          reject(resp.data.error_msg)
        }
      }).catch((err) => {
        if (err.response) {
          reject(err.response.data.msg)
        } else {
          reject(err.message)
        }
      })
    })
  }

  @action getUserDetail() {
    this.user.detail.syncing = true
    return new Promise((resolve, reject) => {
      get(`/user/${this.user.info.loginname}`)
        .then((resp) => {
          if (resp.success) {
            this.user.detail.recent_replies = resp.data.recent_replies
            this.user.detail.recent_topics = resp.data.recent_topics
            resolve()
          } else {
            reject(resp.data.msg)
          }
          this.user.detail.syncing = false
        }).catch((err) => {
          reject(err.message)
          this.user.detail.syncing = false
        })
    })
  }

  @action getUserCollection() {
    this.user.collections.syncing = true
    return new Promise((resolve, reject) => {
      get(`/topic_collect/${this.user.info.loginname}`)
        .then((resp) => {
          if (resp.success) {
            this.user.collections.list = resp.data
            resolve()
          } else {
            reject(resp.data.msg)
          }
          this.user.collections.syncing = false
        }).catch((err) => {
          reject(err.message)
          this.user.collections.syncing = false
        })
    })
  }

  @action setScrollDirectionFlag(flag) {
    this.scrollUp = flag
  }

  @action setSelectedTab(tab) {
    this.selectedTab = tab
  }

  @action setCurrentPath(path) {
    this.currentPath = path
  }

  toJson() {
    return {
      user: toJS(this.user),
    }
  }
}
