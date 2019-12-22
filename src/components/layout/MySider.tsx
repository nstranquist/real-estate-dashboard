import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon, Button } from 'antd'

import { auth } from '../../utils/firebaseHelper'

const StyledSider = styled(Layout.Sider)`
  height: 100vh;
  left: 0;
  position: fixed;
  overflow: auto;
`
const LogoutBtn = styled.div`
  color: white;
  font-size: 1.3rem;
  text-align: center;
  width: 90%;
  margin-left: 5%;
  padding: 3px;
  border-radius: 1px;
  position: absolute;
  bottom: 15px;
  transition: .2s ease-in-out;

  :hover {
    transition: .2s ease-in-out;
    cursor: pointer;
  }
`
const StyledLogoLink = styled(Link)`
  display: block;
  margin: 5px auto;
  padding: 5px 0;
  color: white;
  font-family: sans-serif;
  font-size: 24px;
  // background: rgba(255,255,255,.2);
`

interface IProps {
  width: number
  userName: string  // display name for top of page
}

// TODO: make sidebar wider, responsive for tablets, better button clicker
const MySider: React.FC<IProps> = ({
  width,
  userName
}) => {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const handleLogout = (e: any) => {
    e.preventDefault()
    auth.signOut()
  }

  return (
    <StyledSider
      width={width}
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
      <LogoutBtn>
        <Button type='ghost' onClick={(e) => handleLogout(e)} style={{color:'white', display: 'block', width:'100%'}}>
          Logout</Button>
      </LogoutBtn>
    </StyledSider>
  )
}

export default MySider
