import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'// eslint-disable-line
import { Provider } from 'mobx-react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { lightBlue, pink } from '@material-ui/core/colors'
import App from './views/App'
import { AppState, TopicStore } from './store/store'

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    accent: pink,
    type: 'light',
  },
})

const initialState = window.__INIT_STATE__ || {} // eslint-disable-line

const createApp = (TheApp) => {
  class Main extends React.Component {
    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side')
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles)
      }
    }

    render() {
      return <TheApp />
    }
  }
  return Main
}

const appState = new AppState()

if (initialState.appState) {
  appState.init(initialState.appState)
}

const topicStore = new TopicStore(initialState.topicStore, appState)

const root = document.getElementById('root')

const render = (Component) => {
  const renderMethod = module.hot ? ReactDom.render : ReactDom.hydrate
  renderMethod(
    <AppContainer>
      <Provider appState={appState} topicStore={topicStore}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <Component />
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}
render(createApp(App))

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default// eslint-disable-line
    render(createApp(NextApp))
  })
}

