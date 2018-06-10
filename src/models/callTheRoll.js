import * as resSrv from '../services/res';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'callTheRoll',

  state: {
    course: null,
    pin: null,
    start: false,
    lesson_id: null,
    finish: false,
  },

  subscriptions: {
  },

  effects: {

    *start({ payload:{ course_id } }, { call, put }) {  // eslint-disable-line
      if (!course_id) return;

      const pinResp = yield call(resSrv.addLesson, course_id);

      if (pinResp.ok) {
        yield put({
          type: 'startCall',
          payload: {
            lesson_id: pinResp.body.data.lesson_id,
            pin: pinResp.body.data.pin,
          }
        });
      }
    },

    *stop({ payload:{ lesson_id, course_id } }, { call, put }) {  // eslint-disable-line
      if (!lesson_id || !course_id) return;
      yield put({ type: 'setFinish' });
      const courseFlatResp = yield call(resSrv.fetchCourseFlat, course_id);
      if (courseFlatResp.ok) {
        const lessonStat = yield call(resSrv.fetchLessonStat, lesson_id);
        if (lessonStat.ok) {
          yield put({ type: 'res/cleanStatCourseFlat' });
          yield put({
            type: 'res/loadStatCourseFlat',
            payload: {
              statCourseFlat: courseFlatResp.body.data,
            }
          });
          yield put({ type: 'res/cleanLessonStat' });
          yield put({
            type: 'res/loadLessonStat',
            payload: {
              lessonStat: lessonStat.body.data,
            }
          });
        }
      }
      yield put(routerRedux.push({
        pathname: '/my/statistics',
      }));
      yield put({ type: 'clean' });
    },

    *prepareCallTheRoll({ payload:{ course } }, { call, put }) {  // eslint-disable-line
      if (!course) return;
      yield put({ type: 'clean' });
      yield put({ type: 'teacher/clearCallTheRollPrepareModal' });
      yield put({
        type: 'loadCourse',
        payload: {
          course: course
        }
      });
      yield put(routerRedux.push({
        pathname: '/my/call',
      }));
    },
  },

  reducers: {
    startCall(state, { payload: { lesson_id: lesson_id, pin:pin }}) {
      return { ...state, start:true, lesson_id, pin };
    },
    setFinish(state) {
      return { ...state, finish:true };
    },
    loadCourse(state, { payload: { course: course } }) {
      return { ...state, course };
    },
    clean(){
      return {
        course: null,
        pin: null,
        start: false,
        lesson_id: null,
        finish: false,
      };
    },
  },
};
