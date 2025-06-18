import { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';

import { editPost, getPost } from "@services/blogService";
import { useToast } from "@contexts/ToastContext";
import { Blog } from "@type/blogs";

const EditPost: React.FC = () => {
  const [blog, setBlog] = useState<Blog>({} as Blog);
  const navigate = useNavigate();
  const { openToast, handleSetMessage } = useToast();
  const { postId } = useParams<{ postId: string }>();
  const [searchParams, ] = useSearchParams();
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

  const callUpdatePost = async () => {
    const response = await editPost(blog);
    if (response) {
      handleSetMessage("Post updated successfully!");
      openToast();
      // Redirect to posts page after successful post creation
      navigate("/app/posts");
    }
  };

  return (
    <Box>
      <div className="d-flex justify-content-between">
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Post
        </Typography>
        <div>
            <IconButton
          aria-label="create-post"
          size="medium"
          sx={{ color: "#2b282b" }}
          onClick={() => navigate(redirectTo, { replace: true })}
        >
          <CancelIcon />
        </IconButton>
        </div>
      </div>
      <TextField
        value={blog.title}
        onChange={(e) => {
          setBlog({ ...blog, title: e.target.value });
        }}
        sx={{ mt: 2 }}
        label="Headline"
        fullWidth
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <TextField
        value={blog.text}
        onChange={(e) => {
          setBlog({ ...blog, text: e.target.value });
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
          inputLabel: { shrink: true },
        }}
      />
      <div className="d-flex justify-content-end">
        <Button sx={{ mt: 1 }} variant="contained" onClick={callUpdatePost}>
          Update
        </Button>
      </div>
    </Box>
  );
};

export default EditPost;
