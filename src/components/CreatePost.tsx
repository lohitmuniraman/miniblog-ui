import React, { useState } from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';

import { createPost } from "@services/blogService";
import { useToast } from "@contexts/ToastContext";

const CreatePost: React.FC = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { openToast, handleSetMessage } = useToast();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/app/posts";

  const callCreatePost = async () => {
    const response = await createPost({ text, title });
    if (response) {
      setText("");
      handleSetMessage("Post created successfully!");
      openToast();
      // Redirect to posts page after successful post creation
      navigate("/app/posts");
    }
  };

  return (
    <Box>
      <div className="d-flex justify-content-between">
        <Typography variant="h4" component="h1" gutterBottom>
          Create Post
        </Typography>
        <div>
          <IconButton
            aria-label="create-post-cancel"
            size="medium"
            sx={{ color: "#2b282b" }}
            onClick={() => navigate(redirectTo, { replace: true })}
          >
            <CancelIcon />
          </IconButton>
        </div>
      </div>

      <TextField
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        sx={{ mt: 2 }}
        label="Headline"
        slotProps={{ inputLabel: { shrink: true } }}
        fullWidth
      />
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
          inputLabel: { shrink: true },
        }}
      />
      <div className="d-flex justify-content-end">
        <Button sx={{ mt: 1 }} variant="contained" onClick={callCreatePost}>
          Post
        </Button>
      </div>
    </Box>
  );
};

export default CreatePost;
