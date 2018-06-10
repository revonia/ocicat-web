import React from 'react';
import styles from './UserCard.css';
import {Card, Icon} from "antd";
import { Link } from "dva/router";

const greeting = () => {
  let hours = (new Date()).getHours();
  if (hours < 5 || hours > 23 ) return "夜深了，早点休息吧。";
  else if (hours > 5 && hours < 9) return "早上好！";
  else if (hours < 12) return "上午好！";
  else if (hours < 14) return "中午好！";
  else if (hours < 17) return "下午好！";
  else if (hours < 19) return "傍晚好！";
  else if (hours < 23) return "晚上好！";
  else return "欢迎回来！";
};

function UserCard({ user, children }) {
  let name = user.username;
  if (user.profile.nickname !== null) {
    name = user.profile.nickname;
  }
  if (user.profile.realname !== null) {
    name = user.profile.realname;
  }
  let role = '';
  switch (user.role_type) {
    case 'student':
      role = '同学';break;
    case 'teacher':
      role = '老师';break;
    case 'admin':
      role = '管理员';break;
  }

  return (
    <Card>

      <div className={styles.avatar}>
        <Icon type="user" style={{ fontSize: '48px'}}/>
      </div>

      <div className={styles.infopanel}>
        <h2 width='50%'>
          {name}{role}，{greeting()}
        </h2>
        <div>
          {/*<Link to="/my/account">你需要进一步完善信息，才能继续使用>></Link>*/}
          {children}
        </div>
      </div>
    </Card>
  );
}

export default UserCard;
