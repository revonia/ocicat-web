import * as resSrv from '../services/res';

export default {

  namespace: 'res',

  state: {
    courseFlat: null,
    statCourseFlat: null,
    classns: null,
    lessonStat: null,
  },

  subscriptions: {
  },

  effects: {
    *fetchCourseFlat({ payload:{ course_id } }, { call, put }) {  // eslint-disable-line
      if (!course_id) return;
      yield put({ type: 'cleanCourseFlat' });
      const courseFlatResp = yield call(resSrv.fetchCourseFlat, course_id);
      if (courseFlatResp.ok) {
        yield put({
          type: 'loadCourseFlat',
          payload: {
            courseFlat: courseFlatResp.body.data,
          }
        });
      }
    },
    *fetchStatCourseFlat({ payload:{ course_id } }, { call, put }) {  // eslint-disable-line
      if (!course_id) return;
      yield put({ type: 'cleanStatCourseFlat' });
      const courseFlatResp = yield call(resSrv.fetchCourseFlat, course_id);
      if (courseFlatResp.ok) {
        yield put({
          type: 'loadStatCourseFlat',
          payload: {
            statCourseFlat: courseFlatResp.body.data,
          }
        });
      }
    },
    *fetchCourseClassns({ payload:{ course_id } }, { call, put }) {  // eslint-disable-line
      if (!course_id) return;
      yield put({ type: 'cleanClassns' });
      const courseClassnsResp = yield call(resSrv.fetchCourseClassns, course_id);
      if (courseClassnsResp.ok) {
        yield put({
          type: 'loadClassns',
          payload: {
            classns: courseClassnsResp.body.data,
          }
        });
      }
    },
    *fetchLessonStat({ payload:{ lesson_id } }, { call, put }) {  // eslint-disable-line
      if (!lesson_id) return;
      yield put({ type: 'cleanLessonStat' });
      const lessonStat = yield call(resSrv.fetchLessonStat, lesson_id);
      if (lessonStat.ok) {
        yield put({
          type: 'loadLessonStat',
          payload: {
            lessonStat: lessonStat.body.data,
          }
        });
      }
    },
  },

  reducers: {
    loadCourseFlat(state, { payload: { courseFlat: courseFlat } }) {
      return { ...state, courseFlat };
    },
    cleanCourseFlat(state){
      return { ...state, courseFlat: null };
    },
    loadStatCourseFlat(state, { payload: { statCourseFlat: statCourseFlat } }) {
      return { ...state, statCourseFlat };
    },
    cleanStatCourseFlat(state){
      return { ...state, statCourseFlat: null };
    },
    loadClassns(state, { payload: { classns: classns } }) {
      return { ...state, classns };
    },
    cleanClassns(state){
      return { ...state, classns: null };
    },
    loadLessonStat(state, { payload: { lessonStat: lessonStat } }) {
      return { ...state, lessonStat };
    },
    cleanLessonStat(state){
      return { ...state, lessonStat: null };
    },
    clean(){
      return { courseFlat: null, classns: null, lessonStat: null, statCourseFlat: null };
    },
  },
};
