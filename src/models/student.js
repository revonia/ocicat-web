import * as resSrv from '../services/res';

export default {

  namespace: 'student',

  state: {
    classn: null,
    courses: null,
    stat: null,
    viewCourse: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *showCourseView({}, { put }) {
      yield put({ type: 'setViewCourse' });
    },
    *hideCourseView({}, { put }) {
      yield put({ type: 'clearViewCourse' });
    },
    *preload({ payload:{ classn_id } }, { call, put }) {
      if (classn_id === null || classn_id === undefined) return;
      const classnResp = yield call(resSrv.fetchClassn, classn_id);
      if (classnResp.ok) {
        yield put({
          type: 'loadClassn',
          payload: {
            classn: classnResp.body.data,
          }
        });

        const coursesResp = yield call(resSrv.fetchClassnCourses, classn_id);
        if (coursesResp.ok) {
          yield put({
            type: 'loadCourses',
            payload: {
              courses: coursesResp.body.data,
            }
          });
        }
      }
    },
    *loadStat({ payload:{ student_id } }, { call, put }) {
      if (student_id === null || student_id === undefined) return;
      const studentStatResp = yield call(resSrv.fetchStudentStat, student_id);
      if (studentStatResp.ok) {
        yield put({
          type: 'loadStat',
          payload: {
            stat: studentStatResp.body.data,
          }
        });
      }
    },
  },

  reducers: {
    loadClassn(state, { payload: { classn: classn } }) {
      return { ...state, classn: classn };
    },
    loadCourses(state, { payload: { courses: courses } }) {
      return { ...state, courses:courses };
    },
    clean() {
      return { classn:null, courses:null, stat: null, viewCourse: false };
    },
    loadStat(state, { payload: { stat: stat } }) {
      return { ...state, stat:stat };
    },
    setViewCourse(state) {
      return { ...state, viewCourse: true };
    },
    clearViewCourse(state) {
      return { ...state, viewCourse: false };
    },
  },

};
