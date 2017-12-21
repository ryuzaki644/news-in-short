import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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

let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <AppWithRouter />
  </Provider>, document.getElementById('root'))
// registerServiceWorker()
