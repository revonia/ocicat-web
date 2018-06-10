import React from 'react';
import { connect } from 'dva';
import TeacherStatistics from './teacher';
import StudentStatistics from './student';

class Index extends React.Component {
  componentWillMount() {
    switch (this.props.role.role) {
      case 'teacher':
        break;
      case 'student':
        this.props.dispatch({
          type: 'student/loadStat',
          payload: {
            student_id: this.props.role.id
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
        return (<TeacherStatistics />);
      case 'student':
        return (<StudentStatistics />);
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
