import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

import { auth } from '../../utils/firebaseHelper'

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
  background: rgba(255,255,255,.2);
  transition: .2s ease-in-out;

  :hover {
    background: rgba(255,255,255,.4);
    transition: .2s ease-in-out;
    cursor: pointer;
  }
`

const { Sider } = Layout
const { SubMenu } = Menu

interface IProps {
  userName: string  // display name for top of page
}

// TODO: make sidebar wider, responsive for tablets, better button clicker
const MySider: React.FC<IProps> = ({
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
      <div style={{textAlign: 'center'}}>
        <Link to='/home' style={logoStyle}>
          <span style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.4)" }}>
            {userName}</span></Link>
        <Link to='/home/profile'>View Profile</Link>
      </div>
      <br />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['4']}
        defaultOpenKeys={["subj1"]} // keeps 'lists' open by default
      >
        <SubMenu
          key="subj1"
          title={
            // <Link to='/home' style={{color:'#E2F1FF'}}>
            <span>
              <Icon type="copy" />
              <span>Lists</span>
            </span>
            // </Link>
          }
        >
          <Menu.Item key="1">
            <Link to='/home/properties'>
              <span className="nav-text">Properties</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to='/home/investors'>
              <span className="nav-text">Investors</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to='/home/brokers'>
              <span className="nav-text">Brokers</span>
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="4">
          <Link to='/home/matches'>
            <Icon type="check" />
            <span className="nav-text">Matches</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to='/home/favorites'>
            <Icon type="star" />
            <span className="nav-text">Favorites</span>
          </Link>
        </Menu.Item>
      </Menu>
      <LogoutBtn onClick={(e) => handleLogout(e)}>
        Logout
      </LogoutBtn>
    </Sider>
  )
}

export default MySider

const logoStyle = {
  display: 'block',
  margin: "5px auto",
  padding: '5px 0',
  color: "white",
  fontFamily: 'sans-serif',
  fontSize: '24px',
  //background: "rgba(255, 255, 255, 0.2)",
}