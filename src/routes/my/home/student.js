import React from 'react';
import {connect} from 'dva';
import styles from './student.css';
import {Row, Col, Card, Icon, Calendar, Table, Spin, Modal} from "antd";
import UserCard from "../../../components/My/UserCard";
import CoursesCardShow from "../../../components/My/CoursesCardShow";
import ViewCourseModal from "../../../components/My/ViewCourseModal";



function Index({user, role, classn, courses, studentLoading, dispatch, viewCourse, resLoading, courseFlat}) {

  function courseCardOnClick(id) {
    dispatch({
      type: 'res/fetchCourseFlat',
      payload: {
        course_id: id
      }
    });
    dispatch({
      type: 'student/showCourseView'
    });
  }

  function handleCloseViewCourse() {
    dispatch({
      type: 'student/hideCourseView'
    });
  }

  return (
    <Row type="flex" justify="space-between">
      <Col span={18}>
        <Row style={{marginBottom: '16px'}}>
          <UserCard user={user}>
            <p style={{ fontSize: "14px" }}><Icon type="idcard" /> {role === null ? '...' : role.student_number}&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="team"/> {classn === null ? '...' : classn.name}</p>
          </UserCard>
        </Row>
        <Row>
          <Spin spinning={studentLoading}>
            <Card title="课程一览">
              {courses === null
                ? null
                : <CoursesCardShow courses={courses} handleClick={courseCardOnClick} />
              }
            </Card>
          </Spin>
        </Row>
      </Col>
      <Col span={5}>
        <div style={{border: '1px solid #d9d9d9', borderRadius: 4}}>
          <Calendar fullscreen={false}/>
        </div>
      </Col>
      <ViewCourseModal loading={resLoading} course={courseFlat} visible={viewCourse} onCancel={handleCloseViewCourse} />
    </Row>
  );
}

function mapStateToProps(state) {
  return {
    user: state.me.user,
    role: state.me.role,
    classn: state.student.classn,
    courses: state.student.courses,
    studentLoading: state.loading.models.student,
    resLoading: state.loading.models.res,
    viewCourse: state.student.viewCourse,
    courseFlat: state.res.courseFlat,
  };
}

export default connect(mapStateToProps)(Index);
