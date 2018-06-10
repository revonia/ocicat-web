import React from 'react';
import {Card, Col, Collapse, Icon, Row, Spin, Tree} from "antd";
const TreeNode = Tree.TreeNode;
const Panel = Collapse.Panel;
import styles from './CourseLessonsTree.css';
import { timestampToDatetime } from '../../utils/helper';

function LessonTree({lessons, loading, handleLessonClick, activeLessonId}) {
  if (loading) {
    return (<Tree><TreeNode title={<Spin size="small" />} key="loading" disabled={true} isLeaf={true} /></Tree>);
  }

  if (lessons === null || lessons === undefined) {
    return (<Tree><TreeNode title="没有签到记录" key="null" disabled={true} isLeaf={true} /></Tree>);
  }
  const lessonTreeNodes = lessons.map((lesson) => {
    return (<TreeNode title={timestampToDatetime(lesson.timestamp)} key={lesson.id} isLeaf={true}/>);
  });

  return (
    <Tree onSelect={(lesson_id) => {handleLessonClick(lesson_id)}} defaultSelectedKeys={[activeLessonId]}>
      {[lessonTreeNodes]}
    </Tree>
  );
}



function CourseLessonsTree({ courses, lessons, handleCourseClick, handleLessonClick, lessonLoading, activeCourseId, activeLessonId }) {
  if (!courses) return (<div>没有课程</div>);

  const coursePanels = courses.map((course) =>
    <Panel header={course.name} key={course.id}>
      <LessonTree lessons={lessons} loading={lessonLoading} handleLessonClick={handleLessonClick} activeLessonId={activeLessonId}/>
    </Panel>
  );

  return (
    <div className={ styles.tree }>
      <Collapse bordered={false} accordion defaultActiveKey={activeCourseId} onChange={(course_id) => { handleCourseClick(course_id) }}>
        {coursePanels}
      </Collapse>
    </div>
  );
}

export default CourseLessonsTree;
