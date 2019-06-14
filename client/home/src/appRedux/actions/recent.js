import axios from 'axios';
import { SET_RECENT } from './types';

const setRecent = recent => ({
  type: SET_RECENT,
  payload: recent,
});

const getRecent = () => dispatch => axios.get('/api/v2/post/lastposts').then((result) => {
  const { data } = result;
  dispatch(setRecent(data));
}).catch(() => {
  dispatch({
    type: SET_RECENT,
    payload: [],
  });
});

export default getRecent;
