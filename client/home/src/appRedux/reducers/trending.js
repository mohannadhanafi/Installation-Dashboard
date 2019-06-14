import * as types from '../actions/types';

const initialState = {
  trendingPosts: {
    Trending: [], finalData: [],
  },
};

const trending = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TRENDING:
      return {
        ...state,
        trendingPosts: { ...initialState.trendingPosts, ...action.payload },
      };


    default:
      return state;
  }
};

export default trending;
