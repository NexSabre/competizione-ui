import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import LinearProgressWithLabelAndMinutes, {
  LinearProgressWithLabel,
} from "../LinearProgressWithLabel";
import GetData, { IActivityData } from "../../data";

const DashboardSummary = () => {
  const MAX_WEEK: number = 8;
  const data = GetData;

  const getTotalTime = () => {
    let totalTime: number = 0;
    Object.entries(data.activities).forEach((e: any) => {
      totalTime += (e[1] as IActivityData).duration;
    });
    return totalTime;
  };

  const getTotalWeeks = () => {
    let totalWeeks: any = [];
    Object.entries(data.activities).forEach((e: any) => {
      totalWeeks.push((e[1] as IActivityData).week);
    });
    console.log(totalWeeks);
    return Math.max(...totalWeeks);
  };

  return (
    <Card style={{ marginTop: "120px" }}>
      <CardMedia
        component={"img"}
        image="/cycle.jpeg"
        alt="summary image"
        height="140px"
      />
      <CardContent>
        <Typography variant="h4" color="text.secondary" gutterBottom>
          Summary
        </Typography>
        <Typography variant="h5" component="div">
          {getTotalTime()} minutes total @ {getTotalWeeks()}/{MAX_WEEK} weeks
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
        <Typography variant="h6" style={{ fontStyle: "italic" }}>
          "Keep on, keepin on!"
        </Typography>
        <LinearProgressWithLabel value={getTotalWeeks()} maxValue={MAX_WEEK} />
      </CardContent>
    </Card>
  );
};

export default DashboardSummary;
