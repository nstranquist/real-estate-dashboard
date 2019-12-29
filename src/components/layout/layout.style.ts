import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Layout, PageHeader } from 'antd'

// sider styled components
export const StyledSider = styled(Layout.Sider)`
  height: 100vh;
  left: 0;
  position: fixed;
  overflow: auto;
`
export const StyledLogoutBtn = styled.div`
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

  &:hover {
    transition: .2s ease-in-out;
    cursor: pointer;
  }
`
export const StyledLogoLink = styled(Link)`
  display: block;
  margin: 5px auto;
  padding: 5px 0;
  color: white;
  font-family: sans-serif;
  font-size: 24px;
  // background: rgba(255,255,255,.2);
`

// page header styled coponents:
export const StyledPageHeader = styled(PageHeader)`
  border: 1px solid rgb(235, 237, 240);
  background: white;
`