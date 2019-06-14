import * as types from '../actions/types';

const initialState = {
  options: [],
};

const options = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_OPTIONS:
      return {
        ...state,
        options: action.payload,
      };


    default:
      return state;
  }
};

export default options;
