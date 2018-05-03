import React from 'react'
import { Provider } from 'react-redux'
import App from './models/example/App'
import BasicLayout from './layouts/BasicLayout'
import UserLayout from './layouts/UserLayout'
import { BrowserRouter, HashRouter, Route, hashHistory, Switch, Redirect } from 'react-router-dom'
import { getRouterData } from './common/router'
import { pushStore } from './common/menu'
import axios from './utils/request'
import _ from 'lodash'
export default class RootComponent extends React.Component {
    state = { store: this.props.store, globalEventDistributor: this.props.globalEventDistributor };

    componentDidCatch(error, info) {
      console.log(error, info)
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
      let store = this.state.globalEventDistributor.getState()
      let menu = []
      Object.keys(store).forEach((name) => {
        if (store[name].menu) {
          if (_.isArray(store[name].menu)) {
            store[name].menu.forEach((item) => {
              pushStore(item)
            })
          } else {
            pushStore(store[name].menu)
          }
        }
      })
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
