import React from 'react';
import { Icon, Modal, Row, Spin, Col, Table} from "antd";
import { timestampToDatetime } from '../../utils/helper';
import styles from './LessonStatTable.css';

const studentColumns = [{
  title: '学生姓名',
  dataIndex: 'profile.realname',
  key: 'realname',
},{
  title: '学号',
  dataIndex: 'student_number',
  key: 'student_number',
},{
  title: '是否到席',
  dataIndex: 'verify_timestamp',
  key: 'attendance',
  render: (timestamp) => {
    if (timestamp > 0) {
      return (<span style={{ color:"green" }}><Icon type="check-circle" /></span>);
    } else {
      return (<span style={{ color:"orange" }}><Icon type="exclamation-circle" /></span>);
    }
  },
},{
  title: '签到成功时间',
  dataIndex: 'verify_timestamp',
  key: 'verify_timestamp',
  render: (timestamp) => {
    if (timestamp > 0) {
      return (<span>{timestampToDatetime(timestamp)}</span>);
    } else {
      return (<span>--</span>);
    }
  },
}];

const classnColumns = [{
  title: '班级',
  dataIndex: 'name',
  key: 'classns.name',
},{
  title: '班级人数',
  dataIndex: 'students_count',
  key: 'students_count',
},{
  title: '出勤人数',
  dataIndex: 'attendances_count',
  key: 'attendances_count',
},{
  title: '缺勤人数',
  dataIndex: 'attendances_count',
  key: 'absents_count',
  render: (text, record) => {
    return (<span>{record.students_count - record.attendances_count}</span>);
  },
},{
  title: '出勤率',
  dataIndex: 'attendances_count',
  key: 'attendance_rate',
  render: (text, record) => {
    return (<span>{ (record.attendances_count / record.students_count * 100).toFixed(2) }%</span>);
  },
}];

function LessonStatTable({ lessonStat, loading }) {
  return (
    <Table
      rowKey={record => record.id}
      className={styles.statTable}
      columns={classnColumns}
      dataSource={lessonStat ? lessonStat.classns : null}
      size="large"
      pagination={false}
      loading={loading}
      expandedRowRender={record => <Table size="middle" dataSource={record.students} columns={studentColumns} pagination={false} rowKey={record => record.id}/>}
    />
  );
}

export default LessonStatTable;
