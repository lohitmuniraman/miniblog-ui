import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { getPost } from "@services/blogService";
import { Blog } from "@type/blogs";

const PostDetails: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [blog, setBlog] = useState<Blog>({} as Blog);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/app/posts";

  useEffect(() => {
    getPost(postId || "")
      .then((response) => {
        setBlog(response);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#ecd8cc",
        color: "#2b282b",
      }}
    >
      <div className="d-flex justify-content-between">
        <Typography variant="h4" component="h1">
          {blog.title}
        </Typography>
        <IconButton
          aria-label="create-post-cancel"
          size="medium"
          sx={{ color: "#2b282b" }}
          onClick={() => navigate(redirectTo, { replace: true })}
        >
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <div className="d-flex justify-content-between">
        <Typography variant="subtitle2" component="h1">
          {`@${blog.username}`}
        </Typography>
        <Typography variant="subtitle2" component="h1">
          {`${new Date(blog?.createdAt?.toString())?.toLocaleDateString()}`}
        </Typography>
      </div>
      <hr />

      <Typography variant="body1" component="p" sx={{ mt: 2, textAlign: "justify" }}>
        {blog.text}
      </Typography>
    </Box>
  );
};

export default PostDetails;
