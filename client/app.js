import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'//eslint-disable-line
import App from './views/App.jsx'//eslint-disable-line

const root = document.getElementById('root')
const render = (Component) => {
  const renderMethod = module.hot ? ReactDom.render : ReactDom.hydrate
  renderMethod(
    <AppContainer>
      <Component />
    </AppContainer>,
    root,
  )
}
render(App)

if (module.hot) {
  module.hot.accept('./views/App.jsx', () => {
    const NextApp = require('./views/App.jsx').default //eslint-disable-line
    render(NextApp)
  })
}

