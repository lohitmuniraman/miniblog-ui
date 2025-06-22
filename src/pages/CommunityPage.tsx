import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { useNavigate } from "react-router-dom";

import { useAuth } from "@contexts/AuthContext";
import { User } from "@type/auth";

const CommunityPage: React.FC = () => {
  const { getCommunityUsers, user: loggedInUser } = useAuth();
  const [users, setUsers] = React.useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const communityUsers = await getCommunityUsers();
        const filteredList = loggedInUser?.isAdmin ? communityUsers.filter(user => (!user.isAdmin)) : communityUsers;
        setUsers(filteredList);
      } catch (error) {
        console.error("Failed to fetch community users:", error);
      }
    };

    fetchUsers();
  }, [getCommunityUsers]);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {loggedInUser?.isAdmin ? "User Management" : "Community"}
      </Typography>
      <hr />

      {!loggedInUser?.isAdmin ? (
        <>
          <Box>
            <Typography variant="h6" component="h2" gutterBottom>
              Welcome to the Community Page!
            </Typography>
            <Typography variant="body1">
              This is a space where you can connect with other users, share
              ideas, and discuss topics of interest.
            </Typography>
          </Box>
          <hr />
        </>
      ) : null}

      <Box>
        {users.length > 0 ? (
          <List sx={{ width: "100%", maxWidth: 360 }}>
            {users.map((user) => (
              <ListItem
                sx={{ bgcolor: "rgba(0,0,0,0.02)", mb: 1, borderRadius: 1 }}
                key={user.userId}
                secondaryAction={
                  loggedInUser?.isAdmin ? (
                    <IconButton onClick={(() => navigate(`/app/user-management/${user.userId}`))}>
                      <EditSquareIcon />
                    </IconButton>
                  ) : <></>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{ bgcolor: "#2b282b", height: "48px", width: "48px" }}
                  >{`${user.name.charAt(0)} ${user.name
                    .charAt(user.name.length - 1)
                    .toUpperCase()}`}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={`Joined ${new Date(
                    user.createdAt?.toString() || ""
                  ).toLocaleDateString()}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1">
            No users found in the community.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CommunityPage;
