import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import Athlete from "./Athlete";

const WeekSummary = () => {
  return (
    <Card style={{ marginTop: "100px" }}>
      <CardContent>
        <Typography variant="h3" color="text.secondary" gutterBottom>
          1st week summary!
        </Typography>
        <Typography variant="h5" component="div">
          1700 minutes in this week
        </Typography>
        <Athlete />
      </CardContent>
    </Card>
  );
};

export default WeekSummary;
