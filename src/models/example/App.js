import React, { Component } from 'react'
import logo from '../../assets/logo.svg'
import './App.css'
import { observable, action, autorun } from 'mobx'
import { observer } from 'mobx-react'
import { connect } from 'react-redux'
import { DatePicker } from 'antd'
class App extends Component {
  increment = () => {
    this.props.dispatch({ type: 'INCREMENT' })
  };

  decrement = () => {
    this.props.dispatch({ type: 'DECREMENT' })
  };

  globalIncrement = () => {
    this.props.globalEventDistributor.dispatch({ type: 'INCREMENT' })
  };

  globalDecrement = () => {
    this.props.globalEventDistributor.dispatch({ type: 'DECREMENT' })
  };
  render() {
    // let store = this.store.store
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.increment}>本地事件 +</button>
        {this.props.count}
        <button onClick={this.decrement}>本地事件 -</button>
        <div>
          <button onClick={this.globalIncrement}>全局事件 +</button>
          {this.props.count}
          <button onClick={this.globalDecrement}>全局事件 -</button>
        </div>
        <DatePicker />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    count: state.count
  }
}
export default connect(mapStateToProps)(App)
