import React, { Fragment } from 'react'
import { Layout, Icon, message, Menu } from 'antd'
import { BrowserRouter, Route, hashHistory, Switch, Redirect, Link } from 'react-router-dom'
import { ContainerQuery } from 'react-container-query'
import DocumentTitle from 'react-document-title'
import classNames from 'classnames'
import NotFound from '../routes/Exception/404'
import { getRoutes } from '../utils/utils'
import { getMenuData } from '../common/menu'
import SiderMenu from '../components/SiderMenu/'
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
      const { routerData, location } = this.props
      const { pathname } = location
      let title = '金诚招采管理系统'
      if (routerData[pathname] && routerData[pathname].name) {
        title = `${routerData[pathname].name} - Ant Design Pro`
      }
      return title
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
      const menus = getMenuData()
      const bashRedirect = this.getBashRedirect()
      const layout = (
        <Layout>
          <SiderMenu
            // logo={logo}
            // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
            // If you do not have the Authorized parameter
            // you will be forced to jump to the 403 interface without permission

            menuData={getMenuData()}
            collapsed={collapsed}
            location={location}
            onCollapse={this.handleMenuCollapse}
          />
          <Layout >
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className='trigger'
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: '100vh' }}>
              <Switch>
                {/* {redirectData.map(item => (
                  <Redirect key={item.from} exact from={item.from} to={item.to} />
                ))} */}
                {console.log(getRoutes(match.path, routerData))}
                {getRoutes(match.path, routerData).map(item => (
                  <Route key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
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
