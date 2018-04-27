import React, { Fragment } from 'react'
import { Layout, Icon, message, Menu } from 'antd'
import { BrowserRouter, Route, hashHistory, Switch, Redirect, Link } from 'react-router-dom'
import { ContainerQuery } from 'react-container-query'
import DocumentTitle from 'react-document-title'
import classNames from 'classnames'
import Test from '../routes/index'
import NotFound from '../routes/Exception/404'
import { getRoutes } from '../utils/utils'
import './BasicLayout.less'
// import Authorized from '../utils/Authorized'
const { Header, Sider, Content } = Layout
// const { AuthorizedRoute, check } = Authorized
const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
}
export default class BasicLayout extends React.PureComponent {
    state = {
      collapsed: false,
    };
    componentDidMount() {
    }
    componentWillUnmount() {
      unenquireScreen(this.enquireHandler)
    }
    getPageTitle() {
    //   const { routerData, location } = this.props
    //   const { pathname } = location
    //   let title = 'Ant Design Pro'
    //   if (routerData[pathname] && routerData[pathname].name) {
    //     title = `${routerData[pathname].name} - Ant Design Pro`
    //   }
    //   return title
      return ''
    }
    getBashRedirect = () => {
      // According to the url parameter to redirect
      // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
      const urlParams = new URL(window.location.href)

      const redirect = urlParams.searchParams.get('redirect')
      // Remove the parameters in the url
      if (redirect) {
        urlParams.searchParams.delete('redirect')
        window.history.replaceState(null, 'redirect', urlParams.href)
      } else {
        const { routerData } = this.props
        // get the first authorized route path in routerData
        // const authorizedPath = Object.keys(routerData).find(
        //   item => check(routerData[item].authority, item) && item !== '/'
        // )
        // return authorizedPath
        return '/'
      }
      return redirect
    };
    handleMenuCollapse = collapsed => {
      return true
    };
    handleNoticeClear = type => {
    };
    handleMenuClick = ({ key }) => {
    };
    handleNoticeVisibleChange = visible => {
    };

    toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      })
    }
    render() {
      const {
        currentUser,
        collapsed,
        fetchingNotices,
        notices,
        routerData,
        match,
        location,
      } = this.props
      console.log(routerData, match, this.props)
      const bashRedirect = this.getBashRedirect()
      const layout = (
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className='logo' />
            <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
              <Menu.Item key='1'>
                <Icon type='user' />
                <span>nav 1</span>
              </Menu.Item>
              <Menu.Item key='2'>
                <Icon type='video-camera' />
                <span>nav 2</span>
              </Menu.Item>
              <Menu.Item key='3'>
                <Icon type='upload' />
                <span>nav 3</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout >
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className='trigger'
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: '100vh' }}>
              <Test />
              <Switch>
                {/* {redirectData.map(item => (
                  <Redirect key={item.from} exact from={item.from} to={item.to} />
                ))} */}
                {getRoutes(match.path, routerData).map(item => (
                  <Route key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                    authority={item.authority}
                    redirectPath='/exception/403'
                  />

                ))}
                <Redirect exact from='/' to={bashRedirect} />
                <Route render={NotFound} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      )

      return (
        <DocumentTitle title={this.getPageTitle()}>
          <ContainerQuery query={query}>
            {params => {
              return <div className={classNames(params)}>{layout}</div>
            }}
          </ContainerQuery>
        </DocumentTitle>
      )
    }
}
