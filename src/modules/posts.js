import * as postsAPI from '../api/posts'
import {
  handleAsyncActions, handleAsyncActionsId,
  createPromiseSaga,
  createPromiseSagaById,
  reducerUtils
} from '../lib/asyncUtils';
import {takeEvery, getContext, select} from 'redux-saga/effects';

const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

const GO_TO_HOME = 'GO_TO_HOME';
const PRINT_STATE = 'PRINT_STATE';

// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
// export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);

export const getPosts = () => ({type: GET_POSTS});

export const getPost = id => ({
  type: GET_POST,
  payload: id,
  meta: id
});

export const goToHome = () => ({type: GO_TO_HOME});

export const printState = () => ({type: PRINT_STATE});

const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById);

function* goToHomeSaga() {
  const history = yield getContext('history');
  history.push('/');
}

function* printStateSaga() {
  const state = yield select(state => state.posts);
  console.log(state);
}

// function* getPostsSaga() {
//   try {
//     const posts = yield call(postsAPI.getPosts);
//     yield put({
//       type: GET_POSTS_SUCCESS,
//       payload: posts
//     });
//   } catch (e) {
//     yield put({
//       type: GET_POSTS_ERROR,
//       payload: e,
//       error: true
//     })
//   }
// }
//
// function* getPostSaga(action) {
//   const id = action.meta;
//   try {
//     const post = yield call(postsAPI.getPostById, action.payload);
//     yield put({
//       type: GET_POST_SUCCESS,
//       payload: post,
//       meta: id
//     });
//   } catch (e) {
//     yield put({
//       type: GET_POST_ERROR,
//       payload: e,
//       error: true,
//       meta: id
//     })
//   }
// }

export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
  yield takeEvery(GO_TO_HOME, goToHomeSaga);
  yield takeEvery(PRINT_STATE, printStateSaga);
}

//redux-thunk
// export const goToHome = () => (dispatch, getState, extra) => {
//   extra.history.push('/');
// };

//redux-saga


const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts', true);
const getPostReducer = handleAsyncActionsId(GET_POST, 'post', true);

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return getPostsReducer(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return getPostReducer(state, action);
    default:
      return state;
  }
}
