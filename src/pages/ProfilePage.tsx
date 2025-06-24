import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";

import { getProfile } from "@services/authService";
import { Blog } from "@type/blogs";
import { getAllOfMyPosts } from "@services/blogService";
import BlogComponent from "@components/common/Blog";
import UserAvatar from "@components/common/UserAvatar";

const ProfilePage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const callGetProfile = async () => {
      const response = await getProfile();
      setUsername(response.username);
      setName(response.name);
    };
    const callGetAllOfMyPosts = async () => {
      const response = await getAllOfMyPosts();
      setBlogs(response);
    };
    callGetAllOfMyPosts();
    // Fetch user profile data
    callGetProfile();
  }, []);

  return (
    <Box>
      <hr />
      <List sx={{ width: "100%" }}>
        <ListItem
          secondaryAction={
            <IconButton
              aria-label="create-post"
              size="large"
              sx={{ color: "#2b282b" }}
              onClick={() =>
                navigate("/app/create-post?redirectTo=/app/profile")
              }
            >
              <AddCircleIcon />
            </IconButton>
          }
          alignItems="flex-start"
        >
          <ListItemAvatar>
            <UserAvatar name={name} />
          </ListItemAvatar>
          <ListItemText
            primary={name}
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary", fontWeight: "500" }}
                >
                  {`@${username}`}
                </Typography>
              </>
            }
          />
        </ListItem>
      </List>
      <hr />

      {blogs.length > 0 ? (
        <div className="row">
          {blogs.map((blog) => (
            <div
              className="col-12 col-md-6 col-lg-4 mb-4"
              key={blog._id?.toString()}
            >
              <BlogComponent blog={blog} redirectTo="/app/profile" />
            </div>
          ))}
        </div>
      ) : (
        <Typography variant="caption" sx={{ mt: 2 }}>
          No posts available. Share your anecdotes!
        </Typography>
      )}
    </Box>
  );
};

export default ProfilePage;
