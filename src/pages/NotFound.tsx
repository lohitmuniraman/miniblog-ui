import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Box
      sx={{
        backgroundColor: "#ecd8cc",
        display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" component="p" sx={{ mt: 2 }}>
          The page you are looking for does not exist. Please check the URL or
          return to the homepage.
        </Typography>
        <Button
          variant="contained"          
          sx={{ mt: 2, backgroundColor: "#2b282b" }}
          onClick={() =>  navigate("/app/posts")}
        >
          Go to Homepage
        </Button>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
