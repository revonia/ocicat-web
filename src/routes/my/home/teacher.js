import React from 'react';
import { connect } from 'dva';
import styles from './teacher.css';
import {Row, Col, Card, Icon, Calendar, Table, Spin} from "antd";
import UserCard from "../../../components/My/UserCard";
import CoursesCardShow from "../../../components/My/CoursesCardShow";
import CallTheRollPrepareModal from "../../../components/My/CallTheRollPrepareModal";

function Index({ user, role, courses, teacherLoading, callTheRollPrepareModal, courseFlat, resLoading, classns, dispatch }) {

  function courseCardOnClick(id) {
    dispatch({
      type: 'teacher/openCallTheRollPrepareModal',
      payload: {
        course_id: id
      }
    });
  }

  function handleCloseCallTheRollPrepareModal() {
    dispatch({
      type: 'teacher/hideCallTheRollPrepareModal'
    });
  }

  function handleStartCallTheRoll() {
    dispatch({
      type: 'callTheRoll/prepareCallTheRoll',
      payload: {
        course: courseFlat
      }
    });
  }

  return (
      <Row type="flex" justify="space-between">
        <Col span={18}>
          <Row style={{ marginBottom: '16px' }}>
            <UserCard user={user} >
              <p style={{ fontSize: "14px" }}><Icon type="idcard" /> {role === null ? '...' : role.employee_number}</p>
            </UserCard>
          </Row>
          <Row>
            <Spin spinning={teacherLoading}>
              <Card title="选择课程开始签到">
                {courses === null
                  ? null
                  : <CoursesCardShow courses={courses} handleClick={courseCardOnClick} />
                }
              </Card>
            </Spin>
          </Row>
        </Col>
        <Col span={5}>
          <div style={{ border: '1px solid #d9d9d9', borderRadius: 4 }}>
            <Calendar fullscreen={false} />
          </div>
        </Col>
        <CallTheRollPrepareModal
          loading={resLoading}
          course={courseFlat}
          visible={callTheRollPrepareModal}
          onCancel={handleCloseCallTheRollPrepareModal}
          classns={classns}
          startCallTheRoll={handleStartCallTheRoll}
        />
      </Row>
  );
}

function mapStateToProps(state) {
  return {
    user: state.me.user,
    role: state.me.role,
    courses: state.teacher.courses,
    teacherLoading: state.loading.models.teacher,
    callTheRollPrepareModal: state.teacher.callTheRollPrepareModal,
    courseFlat: state.res.courseFlat,
    resLoading: state.loading.models.res,
    classns: state.res.classns,
  };
}

export default connect(mapStateToProps)(Index);
