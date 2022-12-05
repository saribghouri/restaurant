import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Dashboard = () => {
  return (
    <Box
      className="cards"
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: "100%",
        display: "flex",
        gap: "30px",
      }}
    >
      <Card sx={{ display: "flex", width: "30%" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto", color: "blueviolet" }}>
            <Typography component="div" variant="h7">
              TODAY SALES
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              0
            </Typography>
          </CardContent>
          <Box
            sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
          ></Box>
        </Box>
      </Card>
      <Card sx={{ display: "flex", width: "30%" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto", color: "rgb(26,155,89)" }}>
            <Typography component="div" variant="h7">
              YESTERDAY SALES
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              0
            </Typography>
          </CardContent>
          <Box
            sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
          ></Box>
        </Box>
      </Card>

      <Card sx={{ display: "flex", width: "30%" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto", color: "rgb(25,118,210)" }}>
            <Typography component="div" variant="h7">
              LAST 7 DAY SALES
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              0
            </Typography>
          </CardContent>
          <Box
            sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
          ></Box>
        </Box>
      </Card>
      <Card sx={{ display: "flex", width: "30%", gap: "30px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto", color: "orange" }}>
            <Typography component="div" variant="h7">
              ALL TIMES SALES
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              0
            </Typography>
          </CardContent>
          <Box
            sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
          ></Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Dashboard;
