import * as resSrv from '../services/res';

export default {

  namespace: 'teacher',

  state: {
    courses: null,
    callTheRollPrepareModal: false,
  },

  subscriptions: {
  },

  effects: {
    *preload({ payload:{ teacher_id } }, { call, put }) {
      if (teacher_id === null || teacher_id === undefined) return;
      const coursesResp = yield call(resSrv.fetchTeacherCourses, teacher_id);
      if (coursesResp.ok) {
        yield put({
          type: 'loadCourses',
          payload: {
            courses: coursesResp.body.data,
          }
        });
      }
    },

    *openCallTheRollPrepareModal({ payload:{ course_id } }, { call, put }) {
      if (course_id === null || course_id === undefined) return;

      yield put({ type: 'setCallTheRollPrepareModal' });

      yield put({ type: 'res/cleanCourseFlat' });
      const courseFlatResp = yield call(resSrv.fetchCourseFlat, course_id);
      if (courseFlatResp.ok) {
        yield put({
          type: 'res/loadCourseFlat',
          payload: {
            courseFlat: courseFlatResp.body.data,
          }
        });
      }

      yield put({ type: 'res/cleanClassns' });
      const courseClassnsResp = yield call(resSrv.fetchCourseClassns, course_id);
      if (courseClassnsResp.ok) {
        yield put({
          type: 'res/loadClassns',
          payload: {
            classns: courseClassnsResp.body.data,
          }
        });
      }
    },
    *showCallTheRollPrepareModal({}, { put }) {
      yield put({ type: 'setCallTheRollPrepareModal' });
    },
    *hideCallTheRollPrepareModal({}, { put }) {
      yield put({ type: 'clearCallTheRollPrepareModal' });
    },
  },

  reducers: {
    loadCourses(state, { payload: { courses: courses } }) {
      return { ...state, courses:courses };
    },
    clean() {
      return { courses: null, callTheRollPrepareModal: false };
    },
    setCallTheRollPrepareModal(state) {
      return { ...state, callTheRollPrepareModal: true };
    },
    clearCallTheRollPrepareModal(state) {
      return { ...state, callTheRollPrepareModal: false };
    },
  },

};
