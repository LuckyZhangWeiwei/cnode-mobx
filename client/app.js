import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'//eslint-disable-line
import App from './views/App'

const root = document.getElementById('root')
const render = (Component) => {
  const renderMethod = module.hot ? ReactDom.render : ReactDom.hydrate
  renderMethod(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>,
    root,
  )
}
render(App)

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default//eslint-disable-line
    render(NextApp)
  })
}

