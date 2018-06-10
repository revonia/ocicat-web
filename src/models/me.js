import * as meSrv from '../services/me';
import { notification } from 'antd';
import { EMAIL } from '../config/regex';

export default {
  namespace: 'me',
  state: {
    user: null,
    token: null,
    role: null,
  },
  effects: {
    *login({ payload }, { call, put }) {

      const cacheUsername = payload.username = payload.username.toLowerCase();

      if (EMAIL.test(payload.username)) {
        payload.email = payload.username;
        delete payload.username;
      }

      const tokenResp = yield call(meSrv.login, payload);

      if (tokenResp.ok) {
        window.localStorage['user_token'] = tokenResp.token;

        const userResp = yield call(meSrv.fetch, tokenResp.token);

        if (userResp.ok) {
          yield put({
            type: 'loginSuccess',
            payload: {
              token: tokenResp.token,
              user: userResp.body.data,
            }
          });
          yield put({
            type: 'app/cacheUsername',
            payload: {
              cacheUsername: cacheUsername,
            }
          });

          if (userResp.body.data.role_type !== null) {
            const roleResp = yield call(meSrv.fetchRole);
            if (roleResp.ok) {
              yield put({
                type: 'loadRole',
                payload: {
                  role: roleResp.body.data,
                }
              });
            }
          }
          yield put({
            type: 'app/jumpTo',
            payload: {
              pathname: '/my',
            }
          });

          return;
        }
      }

      //登录失败
      delete window.localStorage['user_token'];
      yield put({
        type: 'clean',
      });
      notification.error({
        message: '登录失败！',
        description: '请检查用户名或密码是否正确。',
      });

    },

    *logout({}, { call, put }) {
      yield put({
        type: 'clean',
      });
      yield put({
        type: 'student/clean',
      });
      yield put({
        type: 'teacher/clean',
      });
      yield put({
        type: 'callTheRoll/clean',
      });
      yield put({
        type: 'res/clean',
      });
      delete window.localStorage['user_token'];
    },

    *signup({ payload }, { call, put }) {
      payload.repassword = undefined;
      payload.username = payload.username.toLowerCase();
      payload.email = payload.email.toLowerCase();

      const response = yield call(meSrv.signup, payload);
      if (response.ok) {
        yield put({
          type: 'app/cacheUsername',
          payload: {
            cacheUsername: payload.username,
          }
        });
        yield put({ type: 'app/finishSignUp' });
      } else {
        notification.error({
          message: '注册失败！',
          description: '状态码:'+response.status,
        });
      }
    },

    *attachRole({ payload:{ role_type, number } }, { call, put }) {
      let data = {
        role_type: role_type,
      };
      if (role_type === 'student') {
        data.student_number = number;
      } else if (role_type === 'teacher') {
        data.employee_number = number;
      }
      const resp = yield call(meSrv.attachRole, data);

      if (resp.ok) {
        const userResp = yield call(meSrv.fetch);
        if (userResp.ok) {
          yield put({
            type: 'refreshUser',
            payload: { user: userResp.body.data }
          });
        }
        const roleResp = yield call(meSrv.fetchRole);
        if (roleResp.ok) {
          yield put({
            type: 'loadRole',
            payload: { role: roleResp.body.data }
          });
          return;
        }
      }
      notification.success({
        message: '请求失败，请尝试刷新页面。',
      });
    }
  },

  reducers: {
    loginSuccess(state, { payload: { token: token, user: user } }) {
      return { ...state, token, user };
    },

    clean() {
      return { token:null, user:null, role:null };
    },

    loadRole(state, { payload: { role: role } }) {
       return { ...state, role };
    },

    refreshUser(state, { payload: { user: user } }){
      return { ...state, user };
    },

  },
  subscriptions: {},
};
