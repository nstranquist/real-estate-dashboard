import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon, Button } from 'antd'
import { StyledLogoutBtn, StyledLogoLink } from './layout.style'
import { auth } from '../../utils/firebaseHelper'


interface IProps {
  width?: number
  userName: string  // display name for top of page
  trigger?: any
  collapsible: boolean
  collapsed: boolean
  toggleCollapse(): void
}

const StyledSider = styled(Layout.Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
`

// TODO: make sidebar wider, responsive for tablets, better button clicker
export const MySider: React.FC<IProps> = ({
  width,
  userName,
  trigger,
  collapsible,
  collapsed,
  toggleCollapse
}) => {

  const handleLogout = (e: any) => {
    e.preventDefault()
    auth.signOut()
  }

  return (
    <Layout.Sider
      // width={width}
      breakpoint="lg"
      collapsedWidth="0"
      collapsed={collapsed}
      trigger={trigger}
      onBreakpoint={broken => {
        console.log('broken:', broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log('collapsed:', collapsed, 'type:', type);
        toggleCollapse()
      }}
    >
    {/* <Layout.Sider
      trigger={trigger}
      collapsible={collapsible}
      collapsed={collapsed}
    > */}
      <div style={{textAlign: 'center'}}>
        <StyledLogoLink to='/home'>
          <span style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.4)" }}>
            {userName}</span>
        </StyledLogoLink>
        <Link to='/home/profile'>View Profile</Link>
      </div>
      <br />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['0']}
        defaultOpenKeys={["lists"]} // keeps 'lists' open by default
      >
        <Menu.Item key="0">
          <Link to='/home'>
            <Icon type='home' />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>

        <Menu.SubMenu
          key="lists"
          title={
            <div>
              <Icon type="copy" />
              <span>Lists</span>
            </div>
          }
        >
          <Menu.Item key="lists-1">
            <Link to='/home/properties'>
              <span className="nav-text">Properties</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="lists-2">
            <Link to='/home/investors'>
              <span className="nav-text">Investors</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="lists-3">
            <Link to='/home/brokers'>
              <span className="nav-text">Brokers</span>
            </Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="4">
          <Link to='/home/matches'>
            <Icon type="check" />
            <span className="nav-text">Matches</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to='/home/stats'>
            <Icon type="star" />
            <span className="nav-text">Stats</span>
          </Link>
        </Menu.Item>
      </Menu>
      <StyledLogoutBtn>
        <Button type='ghost' onClick={(e) => handleLogout(e)} style={{color:'white', display: 'block', width:'100%'}}>
          Logout</Button>
      </StyledLogoutBtn>
    </Layout.Sider>
  )
}
