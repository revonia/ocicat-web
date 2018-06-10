import React from 'react';
import { Icon, Modal, Row, Spin, Col, Table} from "antd";
import {timestampToDatetime } from '../../utils/helper';

const columns = [{
  title: '课程签到历史',
  dataIndex: 'timestamp',
  key: 'timestamp',
  render: (text) => {
    return (<span>{timestampToDatetime(text)}</span>);
  },
}];


function ViewCourseModal({ course, visible, onCancel, loading }) {
  return (
    <Modal title={course ? course.name : '...'} visible={visible} footer={null} onCancel={onCancel}>
      {(loading || !course) ? <Row type="flex" justify="center"><Spin/></Row> : <div>
        <Row type="flex" justify="center"><span style={{ fontSize: "72px" }}><Icon type="book" /></span></Row>
        <Row>
            <Row style={{ paddingBottom:"8px" }} type="flex" justify="center"><Col style={{ textAlign: "center"}} span={6}>课程名称</Col><Col style={{ textAlign: "center"}} span={6}>{course.name}</Col></Row>
            <Row style={{ paddingBottom:"8px" }} type="flex" justify="center"><Col style={{ textAlign: "center"}} span={6}>课程教师</Col><Col style={{ textAlign: "center"}} span={6}>{course.teacher.profile.realname}</Col></Row>
            <Row style={{ paddingBottom:"8px" }} type="flex" justify="center"><Col style={{ textAlign: "center"}} span={6}>教师联系方式</Col><Col style={{ textAlign: "center"}} span={6}><Icon type="phone" />{course.teacher.profile.phone}</Col></Row>
            <Row>
              <Table columns={columns} rowKey={ record => {record.timestamp} } dataSource={course.lessons} size="middle" pagination={false} />
            </Row>
        </Row>
      </div> }
    </Modal>
  );
}

export default ViewCourseModal;
