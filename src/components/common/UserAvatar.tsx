import { Avatar } from "@mui/material";

const UserAvatar = ({ name }: { name: string }) => {
  return (
    <Avatar
      sx={{ bgcolor: "#2b282b", height: "48px", width: "48px" }}
    >{`${name.charAt(0)} ${name
      .charAt(name.length - 1)
      .toUpperCase()}`}</Avatar>
  );
};

export default UserAvatar;
