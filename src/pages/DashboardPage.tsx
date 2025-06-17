import React, { useEffect, useState } from "react";
import { Typography, Box, TextField, Button, Paper } from "@mui/material";
import { useAuth } from "@contexts/AuthContext";
import { createPost, getAllPost } from "@services/blogService";
import { Blog } from "@type/blogs";
// import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const [text, setText] = useState('')
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { user } = useAuth();
  // const navigate = useNavigate();

  const callGetPosts = async () => {
    const blogs = await getAllPost()
    setBlogs(blogs)
  }

  useEffect(() => {
    callGetPosts()
  }, [])

  const callCreatePost = async () => {
    const response = await createPost({ text });
    if (response) {
      callGetPosts()
      setText('')
    }
  }

  return (
    <Box>
      {/* <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography> */}

      <Typography variant="body1">Welcome back, {user?.username}!</Typography>

      <TextField
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        sx={{ mt: 2 }}
        label="Share your story"
        fullWidth
        multiline
        rows={8}
        slotProps={{
          htmlInput: {
            maxLength: 3000,
          },
        }}
      />
      <div className="d-flex justify-content-end">
        <Button sx={{ mt: 1 }} variant="contained" onClick={callCreatePost}>
          Post
        </Button>
      </div>

      <hr />

      {blogs.map((blog: Blog) => {
        return (
          <Paper sx={{ p: 3, mb: 2 }} style={{ backgroundColor: "#ecd8cc" }}>
            <div className="d-flex justify-content-between">
              <Typography variant="caption">{blog.username}</Typography>
              <Typography variant="caption">
                {new Date(blog.createdAt.toString()).toLocaleDateString()}
              </Typography>
            </div>
            <hr />
            <Typography sx={{ wordWrap: "break-word" }} gutterBottom>
              {blog.text}
            </Typography>
          </Paper>
        );
      })}
    </Box>
  );
};

export default DashboardPage;
