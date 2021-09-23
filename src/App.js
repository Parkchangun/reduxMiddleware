import React from 'react';
import CounterContainer from "./containers/CounterContainer";
import PostListPage from "./pages/PostListPage";
import PostPage from "./pages/PostPage";
import {Route} from "react-router-dom";

function App() {
  return (
    <>
      <CounterContainer/>
      <Route path='/' component={PostListPage} exact/>
      <Route path='/:id' component={PostPage}/>
    </>
  );
}

export default App;
