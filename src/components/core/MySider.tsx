import React, { useState } from 'react'
import { Layout, Menu, Icon } from 'antd'

import { auth } from '../../utils/firebaseHelper'

const { Sider } = Layout
const { SubMenu } = Menu

// TODO: make sidebar wider, responsive for tablets, better button clicker
const MySider = () => {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const handleLogout = (e: any) => {
    e.preventDefault()
    auth.signOut()
  }

  return (
    <Sider style={{position:'relative'}}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
        onCollapsed()
      }}
    >
      <div className="logo" >
        <h3 style={logoStyle}>
          <span style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.4)" }}>J Dawson</span></h3>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <SubMenu
          key="subj1"
          title={
            <span>
              <Icon type="copy" />
              <span>Lists</span>
            </span>
          }
        >
          <Menu.Item key="1">
            <span className="nav-text">Brokers</span>
          </Menu.Item>
          <Menu.Item key="2">
            <span className="nav-text">Investors</span>
          </Menu.Item>
          <Menu.Item key="3">
            <span className="nav-text">Properties</span>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="4">
          <Icon type="check" />
          <span className="nav-text">Matches</span>
        </Menu.Item>
        <Menu.Item key="5">
          <Icon type="star" />
          <span className="nav-text">Favorites</span>
        </Menu.Item>
      </Menu>
      <div style={{color:'white', fontSize:'1.5rem', textAlign:'center',
        width: '90%', marginLeft: '5%', padding:'2px',
        position:'absolute', bottom:'15px', cursor:'pointer',
        background:'rgba(255,255,255,.2)', }}
        onClick={(e) => handleLogout(e)}>
        Logout
      </div>
    </Sider>
  )
}

export default MySider

const logoStyle = {
  height: "32px",
  //background: "rgba(255, 255, 255, 0.2)",
  margin: "16px",
  color: "white",
  fontFamily: 'sans-serif',
  fontSize: 24,
}