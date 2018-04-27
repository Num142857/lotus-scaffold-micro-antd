import React from 'react'
import { Provider } from 'react-redux'
import App from './models/example/App'
import BasicLayout from './layouts/BasicLayout'
import { BrowserRouter, Route, hashHistory, Switch, Redirect } from 'react-router-dom'
import { getRouterData } from './common/router'
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
      console.log(routerData)
      if (this.state.store && this.state.globalEventDistributor) {
        ret = <Provider store={this.state.store}>
          <BrowserRouter>
            <Switch>
              <Route path='/' render={props => <BasicLayout routerData={routerData} globalEventDistributor={this.state.globalEventDistributor} {...props} />} />
            </Switch>
          </BrowserRouter>

        </Provider>
      }
      return ret
    }
}
