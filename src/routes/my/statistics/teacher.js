import React from 'react';
import { connect } from 'dva';
import styles from './teacher.css';
import {Row, Col} from "antd";
import CoursesLessonsTree from '../../../components/My/CourseLessonsTree';
import LessonStatTable from '../../../components/My/LessonStatTable';

function Index({ courses, courseFlat, lessonStat, courseFlatLoading, lessonStatLoading, dispatch }) {

  function handleCourseClick(id) {
    if (!id) return;
    dispatch({
      type: 'res/fetchStatCourseFlat',
      payload: {
        course_id: id
      }
    });
  }

  function handleLessonClick(id) {
    if (!id) return;
    dispatch({
      type: 'res/fetchLessonStat',
      payload: {
        lesson_id: id
      }
    });
  }

  return (
    <Row type="flex" justify="space-between">
      <Col span={4}>
        <CoursesLessonsTree
          courses={courses}
          lessons={!courseFlat ? null : courseFlat.lessons}
          lessonLoading={courseFlatLoading}
          handleCourseClick={handleCourseClick}
          handleLessonClick={handleLessonClick}
          activeCourseId={!courseFlat ? null : courseFlat.id.toString()}
          activeLessonId={!lessonStat ? null : lessonStat.id.toString()}
        />
      </Col>
      <Col span={19}>
        <LessonStatTable lessonStat={lessonStat} loading={lessonStatLoading} />
      </Col>
    </Row>
  );
}

function mapStateToProps(state) {
  return {
    courses: state.teacher.courses,
    courseFlat: state.res.statCourseFlat,
    lessonStat: state.res.lessonStat,
    courseFlatLoading: state.loading.effects['res/fetchStatCourseFlat'],
    lessonStatLoading: state.loading.effects['res/fetchLessonStat'],
  };
}

export default connect(mapStateToProps)(Index);
