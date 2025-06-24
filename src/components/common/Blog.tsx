import { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Blog } from "@type/blogs";
import { useAuth } from "@contexts/AuthContext";
import UserAvatar from "./UserAvatar";

const BlogComponent = ({
  blog,
  redirectTo,
}: {
  blog: Blog;
  redirectTo: string;
}) => {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    navigate(`/app/edit-post/${blog._id}?redirectTo=${redirectTo}`);
  };

  const canEdit = () => {
    if (blog.parentBlogId) return false;
    if (user?.username === blog.username) return true;

    return false;
  };

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "rgba(0, 0, 0, 0.02)" }}>
      <CardHeader
        avatar={<UserAvatar name={blog.name.toString()} />}
        action={
          canEdit() ? (
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          ) : null
        }
        title={
          <Typography
            component={RouterLink}
            variant="h6"
            to={`/app/posts/${blog._id}?redirectTo=${redirectTo}`}
            sx={{ textDecoration: "none", color: "#2b282b" }}
          >
            {blog.title.length > 50
              ? `${blog.title.substring(0, 50)}...`
              : blog.title}
          </Typography>
        }
        subheader={blog.name ? `@${blog.username}` : null}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
      </Menu>
      <CardContent>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", textAlign: "justify" }}
        >
          {blog.text.length > 200
            ? `${blog.text.substring(0, 200)}...`
            : blog.text}
        </Typography>
      </CardContent>
      <CardActions>
        {blog.text.length > 200 ? (
          <Button
            onClick={() =>
              navigate(`/app/posts/${blog._id}?redirectTo=${redirectTo}`)
            }
            size="small"
          >
            Show More
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default BlogComponent;
