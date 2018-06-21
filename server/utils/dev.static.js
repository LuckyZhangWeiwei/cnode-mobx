const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const serverConfig = require('../../build/webpack.config.server')
const serverRender = require('./server.render')

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

let serverBundle

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

    serverBundle = m.exports
})

module.exports = (app) => {
   app.use('/public/', proxy({
     target: 'http://localhost:8888'
   }))

    app.get('*', (req, res, next) => {
      if(!serverBundle) {
        return res.send('waiting for compile, refresh later')
      }
      getTemplate()
        .then((template) => {
          return serverRender(serverBundle, template, req, res)
        })
        .catch(next)
    })

}
