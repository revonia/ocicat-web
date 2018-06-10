import React from 'react';
import styles from './CoursesCardShow.css';
import {Card, Col, Icon, Row} from "antd";
import { Link } from "dva/router";

function CoursesCardShow({ courses, handleClick }) {

  const courseCard = courses.map((course) =>
    <div key={course.id}>
      <Col span="6" style={{ padding: "0 8px 16px 8px" }}>
        <a onClick={() => handleClick(course.id)}>
          <Card>
            <p className={styles.course}><Icon type="book" />{course.name}</p>
          </Card>
        </a>
      </Col>
    </div>
  );
  return (
    <div>
      <Row>
        {courseCard}
      </Row>
    </div>
  );
}

export default CoursesCardShow;
