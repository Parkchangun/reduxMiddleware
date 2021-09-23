const myLogger = store => next => action => {
  console.log(action);
  //dispatch되기 이전 state
  console.log('\t', store.getState());
  const result = next(action);
  //action이 reducer에서 dispatch된 다음 state를 가져온다!
  console.log('\t', store.getState());
  //dispatch의 반환값
  return result;
};

export default myLogger;
