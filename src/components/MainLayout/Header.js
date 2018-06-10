import React from 'react';
import styles from './Header.css';
import { Icon, Menu } from "antd";
import { Link, IndexLink } from 'dva/router';

const Item = Menu.Item;
const ItemGroup = Menu.ItemGroup;
const SubMenu = Menu.SubMenu;

function Header({ location }) {
  const sub = (<div><Icon type="down" style={{ marginRight: "8px" }}/>我</div>);
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['/my']}
      selectedKeys={[location.pathname]}
      style={{
        lineHeight: '48px',
        padding: '0 48px',
        fontSize: '16px',
        display: 'flex',
      }}
    >

      <Item key="/my"><IndexLink to="/my"><Icon type="home" />我的主页</IndexLink></Item>
      {/*<Item key="/my/course"><Link to="/my/course"><Icon type="calendar" />课程管理</Link></Item>*/}
      <Item key="/my/statistics"><Link to="/my/statistics"><Icon type="area-chart" />信息统计</Link></Item>
      {/*<Item key="/my/absence"><Link to="/my/absence"><Icon type="smile-o" />请假管理</Link></Item>*/}
      <Item key="none" style={{width: '100%', cursor:'default' }} />
      <SubMenu title={sub} key="me">
        {/*<Item key="/my/account"><Link to="/my/account"><Icon type="user"/>我的账号</Link></Item>*/}
        <Item key="/logout"><Link to="/logout"><Icon type="logout" />注销</Link></Item>
      </SubMenu>
    </Menu>
  );
}

export default Header;
