import React from 'react'
import { Provider } from 'react-redux'
import App from './models/example/App'
import BasicLayout from './layouts/BasicLayout'
import UserLayout from './layouts/UserLayout'
import { BrowserRouter, HashRouter, Route, hashHistory, Switch, Redirect } from 'react-router-dom'
import { getRouterData } from './common/router'
import createHistory from 'history/createBrowserHistory'
import axios from './utils/request'
const history = createHistory()

// Get the current location.
const location = history.location

// Listen for changes to the current location.
const unlisten = history.listen((location, action) => {
  // location is an object like window.location
  console.log('路由更新了', action, location.pathname, location.state)
})

// Use push, replace, and go to navigate around.
// history.push('/home', { some: 'state' })

// To stop listening, call the function returned from listen().
// unlisten()
export default class RootComponent extends React.Component {
    state = { store: this.props.store, globalEventDistributor: this.props.globalEventDistributor };

    componentDidCatch(error, info) {
      console.log(error, info)
    }
    async componentWillMount() {
      let res = await axios.get('/api/fake_chart_data')
      console.log(res)
    }

    setStore(store) {
      this.setState({ ...this.state, store: store })
    }

    setGlobalEventDistributor(globalEventDistributor) {
      this.setState({ ...this.state, globalEventDistributor: globalEventDistributor })
    }

    render() {
      let ret = <div></div>
      const routerData = getRouterData()
      let customProps = { routerData: routerData, globalEventDistributor: this.state.globalEventDistributor }
      console.log(routerData)
      if (this.state.store && this.state.globalEventDistributor) {
        ret = <Provider store={this.state.store}>
          <HashRouter >
            <Switch>
              <Route path='/user' history={history} render={props => <UserLayout {...customProps} {...props} />} />
              <Route path='/' history={history} render={props => <BasicLayout {...customProps} {...props} />} />
            </Switch>
          </HashRouter>

        </Provider>
      }
      return ret
    }
}
