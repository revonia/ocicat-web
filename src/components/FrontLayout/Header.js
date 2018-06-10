import React from 'react';
import styles from './Header.css';
import {Icon, Menu} from "antd";
import { Link, IndexLink } from 'dva/router';

function Header({ location }) {
  return (
    <Menu
      theme={location.pathname === '/' ? 'dark' : 'light'}
      mode="horizontal"
      defaultSelectedKeys={['/']}
      selectedKeys={[location.pathname]}
      style={{
        lineHeight: '64px',
        paddingLeft: '48px',
        fontSize: '16px',
      }}
    >
      <Menu.Item key="/"><IndexLink to="/"><Icon type="home" />奥西签到</IndexLink></Menu.Item>
      <Menu.Item key="/login"><Link to="/login"><Icon type="login" />登录</Link></Menu.Item>
      <Menu.Item key="/signup"><Link to="/signup"><Icon type="user-add" />注册</Link></Menu.Item>
    </Menu>
  );
}

export default Header;
