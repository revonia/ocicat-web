import React from 'react';
import {connect} from 'dva';
import {Row, Col, Card, Icon, Calendar, Table, Spin} from "antd";
import styles from './student.css';
import { timestampToDatetime , timestampToTime } from '../../../utils/helper';


const columns = [{
  title: '课程名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '教师',
  dataIndex: 'teacher.profile.realname',
  key: 'teacher.profile.realname',
}, {
  title: '实到次数',
  dataIndex: 'attendances_count',
  key: 'attendances_count',
}, {
  title: '签到次数',
  dataIndex: 'lessons_count',
  key: 'lessons_count',
}, {
  title: '缺席次数',
  dataIndex: 'absent_count',
  key: 'absent_count',
  render: (text, record) => {
    let absentCount = record.lessons_count - record.attendances_count;
    if (absentCount > 0) {
      return (<span style={{ color:"red" }}><Icon type="exclamation-circle-o" /> {absentCount}</span>);
    } else {
      return (<span>{absentCount}</span>);
    }
  },
}];

const subColumns = [{
  title: '签到开始时间',
  dataIndex: 'start_timestamp',
  key: 'start_timestamp',
  render: (text) => {
    return (<span>{timestampToDatetime(text)}</span>);
  },
}, {
  title: '签到成功时间',
  dataIndex: 'verify_timestamp',
  key: 'verify_timestamp',
  render: (text) => {
    if (parseInt(text) === 0) {
      return (<span style={{ color:"red" }}>未签到</span>);
    } else {
      return (<span>{timestampToTime(text)}</span>);
    }

  },
}];

function Index({ stat, loading }) {
  return (
    <Row type="flex" justify="center">
      {stat === null || stat === undefined ?
        <Spin size="large" />
        : <Col span={22}><Table
            className={styles.statTable}
            dataSource={stat.courses}
            columns={columns}
            loading={loading}
            rowKey={ record => record.id }
            pagination={false}
            expandedRowRender={record => <Table dataSource={record.lessons} columns={subColumns} pagination={false} rowKey={record => record.id}/>}
          /></Col>}
    </Row>
  );
}

function mapStateToProps(state) {
  return {
    stat: state.student.stat,
    loading: state.loading.models.student
  };
}

export default connect(mapStateToProps)(Index);
