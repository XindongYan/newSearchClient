
export default {

  namespace: 'example',

  state: {
    data: [],
    textArray: [],
    searchValue: ''
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *storage({ payload, callback }, { call, put }) {
      yield put({ type: 'data', payload })
      if (callback) callback()
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },

    data(state, action) {
      return {
        ...state,
        data: action.payload.result,
        // textArray: action.payload.textArray
       }
    }
  },

};
