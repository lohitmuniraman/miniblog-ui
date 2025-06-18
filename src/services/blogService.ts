import api from '@config/api';
import { Blog, BlogPost } from '@type/blogs';

export const createPost = async (blog: BlogPost): Promise<Blog | null> => {
  try {
    const response = await api.post('/blog', blog);
    const blogResponse = response.data;
    return blogResponse;
  } catch (error) {
    console.error('Blog post error:', error);
    throw error;
  }
};

export const editPost = async (blog: Blog): Promise<Blog | null> => {
  try {
    const response = await api.patch('/blog', blog);
    const blogResponse = response.data;
    return blogResponse;
  } catch (error) {
    console.error('Blog edit error:', error);
    throw error;
  }
};

export const getPost = async (blogId: string): Promise<Blog> => {
  try {
    const response = await api.get(`/blog/${blogId}`);
    const blogResponse = response.data;
    return blogResponse;
  } catch (error) {
    console.error('Blogs error:', error);
    throw error;
  }
};

export const getAllPosts = async (): Promise<Blog[]> => {
  try {
    const response = await api.get('/all-blogs');
    const blogs = response.data;
    return blogs;
  } catch (error) {
    console.error('Blogs error:', error);
    throw error;
  }
};

export const getAllOfMyPosts = async (): Promise<Blog[]> => {
  try {
    const response = await api.get('/blog');
    const blogs = response.data;
    return blogs;
  } catch (error) {
    console.error('Get my blogs error:', error);
    throw error;
  }
}