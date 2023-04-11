import { Card, CardContent, Typography, Grid, Divider } from "@mui/material";
import Athlete from "./Athlete";
import GetData, { IActivityData } from "../../data";

const getWeekByWeekSummary = (weekData: IActivityData[]) => {
  let tempDict: { [key: number]: number } = {};

  let a = weekData.sort((a: IActivityData, e: IActivityData) => {
    return a.week < e.week ? 1 : 0;
  });

  a.forEach((e) => {
    if (!tempDict[e.week]) {
      tempDict[e.week] = e.duration;
    } else {
      tempDict[e.week] += e.duration;
    }
  });
  return tempDict;
};

const WeekSummary = () => {
  const data = GetData;
  const weekData: { [key: string]: number } = getWeekByWeekSummary(
    data.activities
  );

  const BuildWeeks = () => {
    return Object.keys(weekData).flatMap((e) => {
      return (
        <>
          <Divider style={{ marginTop: "100px" }}></Divider>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h4" component="div">
                Week {e}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="h6" component="div">
                {weekData[e as string]} minutes
              </Typography>
            </Grid>
          </Grid>
        </>
      );
    });
  };
  return (
    <>
      {BuildWeeks()}

      {/* <Card style={{ marginTop: "100px" }}>
        <CardContent>
          <Athlete />
        </CardContent>
      </Card> */}
    </>
  );
};

export default WeekSummary;
