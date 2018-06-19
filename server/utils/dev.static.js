const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const ReactDomServer = require('react-dom/server')
const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
      axios.get('http://localhost:8888/public/index.html')
        .then((res) => {
            resolve(res.data)
        })
        .catch(reject)
  })
}

const Module = module.constructor

const mfs = new MemoryFs

const serverComplier = webpack(serverConfig)

serverComplier.outputFileSystem = mfs

let serverBundle, createStoreMap

serverComplier.watch({}, (err, stats) => {
    if (err) throw err

    stats = stats.toJson()

    stats.errors.forEach(err=>console.error(err))

    stats.warnings.forEach(war=>console.warn(war))

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    )

    const bundle = mfs.readFileSync(bundlePath,'utf-8')

    const m = new Module()

    m._compile(bundle, 'server-entry.js')

    serverBundle = m.exports.default

    createStoreMap = m.exports.createStoreMap
})

module.exports = (app) => {
   app.use('/public/', proxy({
     target: 'http://localhost:8888'
   }))

    app.get('*', (req, res) => {
      getTemplate()
        .then((template) => {
           const routerContext = {}

           const app = serverBundle(createStoreMap(), routerContext, req.url)

           const content = ReactDomServer.renderToString(app)

           res.send(template.replace('<!--app-->',content))
        })
    })

}
