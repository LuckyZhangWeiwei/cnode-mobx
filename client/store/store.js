import AppState from './app-state'

// export const AppState = AppStateClass

export { AppState }

export default { AppState }

export const createStoreMap = () => {
  return {
    appState: new AppState(),
  }
}
