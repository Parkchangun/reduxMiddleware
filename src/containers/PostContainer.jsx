import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../components/Post';
import { reducerUtils } from '../lib/asyncUtils';
import { getPost, goToHome } from '../modules/posts';

function PostContainer({ postId }) {
  const { data, loading, error } = useSelector(
    state => state.posts.post[postId] || reducerUtils.initial()
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
  }, [postId, dispatch]);

  if (loading && !data) return <div>Loading..</div>;
  if (error) return <div>error..</div>;
  if (!data) return null;

  return (
    <>
      <button onClick={() => dispatch(goToHome())}>Go To Home</button>
      <Post post={data} />
    </>
  );
}

export default PostContainer;
