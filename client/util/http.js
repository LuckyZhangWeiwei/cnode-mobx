import axios from 'axios'

const baseUrl = process.env.API_BASE || ''

const parseUrl = (url, params = {}) => {
  const str = Object.keys(params).reduce((result, key) => {
    const r = `${result}${key}=${params[key]}&`
    return r
  }, '')
  return `${url}?${str.substr(0, str.length - 1)}`
}

export const get = (url, params = {}) => (
  new Promise((resolve, reject) => {
    axios.get(parseUrl(`${baseUrl}/api${url}`, params))
      .then((resp) => {
        resolve(resp.data)
      }).catch(reject)
  })
)

export const post = (url, data) => (
  new Promise((resolve, reject) => {
    axios.post(parseUrl(`${baseUrl}/api${url}`), data)
      .then((resp) => {
        resolve(resp.data)
      })
      .catch(reject)
  })
)

export default {
  get, post,
}

