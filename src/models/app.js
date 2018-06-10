import { routerRedux } from 'dva/router';

export default {
  namespace: 'app',
  state: {
    cacheUsername: null,
    finishSignUp: false,
  },
  reducers: {
    cacheUsername(state, {payload: {cacheUsername}}) {
      return { ...state, cacheUsername: cacheUsername };
    },

    finishSignUp(state) {
      if (state.finishSignUp === false) {
        return { ...state, finishSignUp: true };
      }
      return state;
    },

    cleanSignUp(state) {
      if (state.finishSignUp === true) {
        return { ...state, finishSignUp: false };
      }
      return state;
    }

  },
  effects: {
    *jumpTo({ payload }, { call, put }){
      yield put(routerRedux.push({
        pathname: payload.pathname,
        query: payload.query
      }));
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(() => {
        dispatch({
          type: 'cleanSignUp',
        });
      });
    },
  }
}

