import * as types from '../actions/types';

const initialState = {
  recent: [],
};

const recent = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_RECENT:
      return {
        ...state,
        recent: action.payload,
      };


    default:
      return state;
  }
};

export default recent;
