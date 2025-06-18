import React, { useEffect, useState } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { Blog } from "@type/blogs";
import { useAuth } from "@contexts/AuthContext";
import { getAllPosts } from "@services/blogService";
import BlogComponent from "@components/common/Blog";

const PostsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const callGetPosts = async () => {
    const blogs = await getAllPosts();
    setBlogs(blogs);
  };

  useEffect(() => {
    callGetPosts();
  }, []);

  return (
    <Box>
      <div className="row">
        <div className="col d-flex justify-content-between align-items-center">
          <Typography variant="body1">
            Welcome back, <b>{user?.name}</b>!
          </Typography>
          <IconButton
            aria-label="create-post"
            size="large"
            sx={{ color: "#2b282b" }}
            onClick={() => navigate("/app/create-post?redirectTo=/app/posts")}
          >
            <AddCircleIcon />
          </IconButton>
        </div>
      </div>
      <hr />
      {blogs.length > 0 ? (
        <div className="row">
          {blogs.map((blog) => (
            <div
              className="col-12 col-md-6 col-lg-4 mb-4"
              key={blog._id?.toString()}
            >
              <BlogComponent blog={blog} redirectTo="/app/posts" />
            </div>
          ))}
        </div>
      ) : (
        <Typography variant="caption" sx={{ mt: 2 }}>
          No posts available. Start sharing your thoughts!
        </Typography>
      )}
    </Box>
  );
};

export default PostsPage;
