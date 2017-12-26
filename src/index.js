import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {loadState, saveState} from './localStorage'
import App from './App'
// import registerServiceWorker from './registerServiceWorker'
import './index.css'
import reducers from './reducers'
// components
import { Favourites } from './components/favourites/index'

const AppWithRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/favourites' component={Favourites} />
      </Switch>
    </BrowserRouter>
  )
}

const persistedState = loadState()
const store = createStore(reducers, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.subscribe(() => {
  saveState(store.getState())
})
ReactDOM.render(
  <Provider store={store}>
    <AppWithRouter />
  </Provider>, document.getElementById('root'))
// registerServiceWorker()
