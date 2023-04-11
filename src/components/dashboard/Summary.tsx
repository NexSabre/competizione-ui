import {
  Box,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";

const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number }
) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

const DashboardSummary = () => {
  const wProgress: number = (1 / 8) * 100;

  return (
    <Card style={{ marginTop: "100px" }}>
      <CardMedia
        component={"img"}
        image="/cycle.jpeg"
        alt="summary image"
        height="140px"
      />
      <CardContent>
        <Typography variant="h3" color="text.secondary" gutterBottom>
          Summary
        </Typography>
        <Typography variant="h5" component="div">
          1700 minutes total
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          1/8 weeks
        </Typography>
        <Typography variant="body2">"Keep on, keepin on!"</Typography>
        <LinearProgressWithLabel value={wProgress} />
      </CardContent>
    </Card>
  );
};

export default DashboardSummary;
