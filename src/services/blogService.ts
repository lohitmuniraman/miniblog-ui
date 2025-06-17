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

export const getAllPost = async (): Promise<Blog[]> => {
  try {
    const response = await api.get('/blog');
    const blogs = response.data;
    return blogs;
  } catch (error) {
    console.error('Blogs error:', error);
    throw error;
  }
};