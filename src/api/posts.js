import axios from 'axios';

export const getPosts = async () => {
  const res = await axios.get('/posts');
  return res.data;
};

export const getPostById = async id => {
  const res = await axios.get(`/posts/${id}`);
  return res.data;
};
