import React from 'react';
import { connect } from 'dva';
import styles from './index.css';
import TeacherHome from './teacher';
import StudentHome from './student';

class Index extends React.Component {
  componentWillMount() {
    switch (this.props.role.role) {
      case 'teacher':
        this.props.dispatch({
          type: 'teacher/preload',
          payload: {
            teacher_id: this.props.role.id
          }
        });
        break;
      case 'student':
        this.props.dispatch({
          type: 'student/preload',
          payload: {
            classn_id: this.props.role.classn_id
          }
        });
        break;
      default:
        break;
    }
  }
  render() {
    switch (this.props.role.role) {
      case 'teacher':
        return (<TeacherHome/>);
      case 'student':
        return (<StudentHome/>);
      default:
        return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    role: state.me.role,
  };
}

export default connect(mapStateToProps)(Index);
