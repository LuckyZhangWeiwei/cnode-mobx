const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const serialize = require('serialize-javascript')
const ejs =require('ejs')
const bootstrapper = require('react-async-bootstrapper')
const ReactDomServer = require('react-dom/server')
const Helmet = require('react-helmet').default
const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
      axios.get('http://localhost:8888/public/server.ejs')
        .then((res) => {
            resolve(res.data)
        })
        .catch(reject)
  })
}

const NativeModule = require('module')

const vm = require('vm')

const getModuleFromString = (bundle, filename) => {
  const m = {
    exports: {},
  }

  const wrapper = NativeModule.wrap(bundle)

  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true,
  })

   const result = script.runInThisContext()

   result.call(m.exports, m.exports, require, m)

   return m
}

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

    const m = getModuleFromString(bundle, 'server-entry.js')

    serverBundle = m.exports.default

    createStoreMap = m.exports.createStoreMap
})

const getStoreState = (stores) => (
  Object.keys(stores).reduce((result, storeName) => {
    result[storeName]=stores[storeName].toJson()
    return result
  }, {})
)

module.exports = (app) => {
   app.use('/public/', proxy({
     target: 'http://localhost:8888'
   }))

    app.get('*', (req, res) => {
      getTemplate()
        .then((template) => {
           const routerContext = {}

           const stores = createStoreMap()

           const app = serverBundle(stores, routerContext, req.url)

           bootstrapper(app).then(() => {

            if(routerContext.url) {

              res.status(302).setHeader('Location', routerContext.url)

              res.end()

              return
            }

            const helmet = Helmet.rewind()

            const state = getStoreState(stores)

            const content = ReactDomServer.renderToString(app)

            const html = ejs.render(template, {
              appString: content,
              initialState: serialize(state),
              meta: helmet.meta.toString(),
              title: helmet.title.toString(),
              style: helmet.style.toString(),
              link: helmet.link.toString(),
            })

            res.send(html)

           })
        })
    })

}
