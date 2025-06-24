import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import IosShareIcon from "@mui/icons-material/IosShare";

import { createPost, getPost } from "@services/blogService";
import { Blog } from "@type/blogs";
import ConfirmationDialog from "@components/common/ConfirmationDialog";
import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@contexts/ToastContext";

const PostDetails: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [blog, setBlog] = useState<Blog>({} as Blog);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/app/posts";
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const { user } = useAuth();
  const { handleSetMessage, openToast } = useToast();

  useEffect(() => {
    getPost(postId || "")
      .then((response) => {
        setBlog(response);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, [postId]);

  const onPrimaryButtonClick = async () => {
    const blogPayload = {
      title: blog.title,
      text: blog.text,
      parentBlogId: blog._id,
      parentUsername: blog.username,
    };
    const response = await createPost(blogPayload);
    if (response) {
      handleSetMessage("Post shared successfully!");
      openToast();
      navigate("/app/profile");
    }
  };

  const canShare = () => {
    if (blog.parentBlogId) return false;
    if (blog.userId === user?.userId) return false;
    return true;
  };

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
        {blog?.parentUsername ? (
          <Typography
            variant="caption"
            component="p"
            onClick={() =>
              navigate(
                `/app/posts/${blog.parentBlogId}?redirectTo=/app/posts`,
                { replace: true }
              )
            }
            sx={{ cursor: "pointer" }}
          >{`Original by @${blog.parentUsername}`}</Typography>
        ) : null}

        <Typography variant="subtitle2" component="h1">
          {`${new Date(blog?.createdAt?.toString())?.toLocaleDateString()}`}
        </Typography>
      </div>
      <hr />

      <Typography
        variant="body1"
        component="p"
        sx={{ mt: 2, textAlign: "justify" }}
      >
        {blog.text}
      </Typography>
      <hr />

      <div className="d-flex justify-content-between">
        {canShare() ? (
          <IconButton
            aria-label="create-post-cancel"
            size="medium"
            sx={{ color: "#2b282b" }}
            onClick={() => setOpenShareDialog(true)}
          >
            <IosShareIcon />
          </IconButton>
        ) : null}
      </div>
      <ConfirmationDialog
        open={openShareDialog}
        setOpen={setOpenShareDialog}
        title="Confirmation"
        text="Are you sure you want to share this post?"
        onPrimaryButtonClick={onPrimaryButtonClick}
        onSecondaryButtonClick={() => setOpenShareDialog(false)}
        primaryButtonText="Yes"
        secondaryButtonText="No"
      />
    </Box>
  );
};

export default PostDetails;
