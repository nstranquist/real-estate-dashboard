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
  console.log('userName value:', userName)
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