# Redux Middleware

함수를 2번 리턴하는 함수

```javascript
//Arrow Function
const middleware = store => next => action => {
  //To Do
}
//Normal Function
function middleware(store) {
  return function (next) {
    return function (action) {

    };
  };
}
```
- `store`: redux store instance
  - `dispatch`, `getState`, `subscribe` 등 내장 함수가 들어있다
- `next`: 다음 미들웨어에 전달하는 함수
  - `next(action)` 형태로 사용한다
  - 다음 미들웨어가 없다 > `reducer`에게 `action`을 전달한다
  - `next` 미호출 시 액션이 무시 처리되어 `reducer`에게 전달되지 않는다
- `action`: 현재 처리하고 있는 액션 객체이다

redux store에는 여러 개의 미들웨어 등록 가능

새로운 `action`이 `dispatch`되면 첫 번째로 등록한 미들웨어가 호출된다

만약 미들웨어에서 `store.dispatch`를 사용하면 다른 `action`을 추가적으로 발생시킬 수 있다

### Create Middleware Example

```javascript
const myLogger = store => next => action => {
  console.log(action);
  const result = next(action);
  return result;
}

export default myLogger;
```

### Apply Middleware Example

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import myLogger from './middlewares/myLogger';

const store = createStore(rootReducer, applyMiddleware(myLogger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  document.getElementById('root');
)
```

![middleware](./readmeImg/스크린샷%202021-09-23%2011.41.18.png)

## redux-thunk

```javascript
export const thunks = parameters => (dispatch, getState) => {
  //my Logic
}
```

thunk란 몇 가지의 parameters를 인수로 취하고 또 다른 함수를 return하는 함수이다

내부 함수로 `dispatch`와 `getState`함수를 사용한다



## redux-saga

`saga`라 명명된 순수함수로 복잡한 어플리케이션 로직을 표현할 수 있게 해준다

*generator*라 불리는 특별한 함수로 구성되어 있다


