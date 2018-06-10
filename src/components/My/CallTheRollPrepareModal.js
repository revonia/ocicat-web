import React from 'react';
import {Icon, Modal, Row, Spin, Col, Table, Button} from "antd";
import { timestampToDatetime } from '../../utils/helper';

const columns = [{
  title: '课程签到历史',
  dataIndex: 'timestamp',
  key: 'timestamp',
  render: (text) => {
    return (<span>{timestampToDatetime(text)}</span>);
  },
}];

const classnTableColumns = [{
  title: '班级名称',
  dataIndex: 'name',
  key: 'name',
},{
  title: '班级人数',
  dataIndex: 'student_count',
  key: 'student_count',
}];

function CallTheRollPrepareModal({ course, visible, onCancel, loading, classns, startCallTheRoll }) {
  return (
    <Modal
      title={course ? course.name : '...'}
      visible={visible}
      footer={null}
      onCancel={onCancel}
    >
      {(loading || !course) ? <Row type="flex" justify="center"><Spin/></Row> : <div>
        <Row type="flex" justify="center"><span style={{ fontSize: "64px" }}><Icon type="book" /></span></Row>
        <Row>
            <Row style={{ paddingBottom:"8px" }} type="flex" justify="center"><Col style={{ textAlign: "center", fontSize: "22px"}} span={6}>{course.name}</Col></Row>
            <Row style={{ paddingBottom:"8px" }} type="flex" justify="center"><Button key="submit" type="primary" size="large" onClick={() => startCallTheRoll(course.id)}>准备签到</Button></Row>
            {(classns === undefined || classns === null) ? <Row type="flex" justify="center"><Spin/></Row> :
            <Row style={{ paddingBottom:"8px" }}>
              <Table columns={classnTableColumns} rowKey={ record => record.id } dataSource={classns} size="middle" pagination={false} />
            </Row>}
            <Row>
              <Table columns={columns} rowKey={ record => record.timestamp } dataSource={course.lessons} size="middle" pagination={false} />
            </Row>
        </Row>
      </div> }
    </Modal>
  );
}

export default CallTheRollPrepareModal;
