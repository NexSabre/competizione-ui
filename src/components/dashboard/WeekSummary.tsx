import { Typography, Grid, Divider, Card, CardContent } from "@mui/material";
import GetData, { IActivityData } from "../../data";
import LinearProgressWithLabelAndMinutes from "../LinearProgressWithLabel";
import SchwartzianTransform from "../../schwartzianTransform";

const getWeekByWeekSummary = (
  weekData: IActivityData[]
): { [key: number]: number } => {
  const weekSummaryWithSumDuration: { [key: number]: number } = {};

  const weekDataSorted = weekData.sort(
    (first: IActivityData, second: IActivityData) => {
      return first.week < second.week ? 1 : 0;
    }
  );

  weekDataSorted.forEach((activity: IActivityData) => {
    if (!weekSummaryWithSumDuration[activity.week]) {
      weekSummaryWithSumDuration[activity.week] = activity.duration;
    } else {
      weekSummaryWithSumDuration[activity.week] += activity.duration;
    }
  });
  return weekSummaryWithSumDuration;
};

const getAthleteDataPerWeek = (weekData: IActivityData[]) => {
  const weekSummaryWithSumDuration: any = {};

  const weekDataSorted = weekData.sort(
    (first: IActivityData, second: IActivityData) => {
      return first.week < second.week ? 1 : 0;
    }
  );

  weekDataSorted.forEach((activity: IActivityData) => {
    if (!weekSummaryWithSumDuration[activity.week]) {
      const tempDict: any = {};
      tempDict[activity.athlete_name] = activity.duration;

      weekSummaryWithSumDuration[activity.week] = tempDict;
    } else {
      if (!weekSummaryWithSumDuration[activity.week][activity.athlete_name]) {
        weekSummaryWithSumDuration[activity.week][activity.athlete_name] =
          activity.duration;
      } else {
        weekSummaryWithSumDuration[activity.week][activity.athlete_name] =
          weekSummaryWithSumDuration[activity.week][activity.athlete_name] +
          activity.duration;
      }
    }
  });

  return weekSummaryWithSumDuration;
};

const WeekSummary = () => {
  const data = GetData;
  const weekData: { [key: string]: number } = getWeekByWeekSummary(
    data.activities
  );

  const athleteWeekData = getAthleteDataPerWeek(data.activities);

  const BuildWeeks = () => {
    return Object.keys(weekData).flatMap((e) => {
      return (
        <>
          <Divider
            component="div"
            role="presentation"
            style={{ marginTop: "100px" }}
          >
            <Typography
              gutterBottom
              variant="h2"
              color={"text.secondary"}
              component="div"
            >
              Week {e}
            </Typography>
          </Divider>
          <Grid container alignItems="center">
            <Grid item xs></Grid>
            <Grid item>
              <Typography gutterBottom variant="h6" component="div">
                Total: {weekData[e as string]} minutes
              </Typography>
            </Grid>
          </Grid>

          {BuildAtletes(e, weekData[e])}
        </>
      );
    });
  };

  const BuildAtletes = (weekNumber: any, maxMinutesPerWeek: number) => {
    athleteWeekData[weekNumber] = SchwartzianTransform(
      athleteWeekData[weekNumber]
    );
    console.log(athleteWeekData[weekNumber]);
    return Object.entries(athleteWeekData[weekNumber]).map((score: any) => {
      return (
        <>
          <Card>
            <CardContent>
              <Typography variant="h4">{score[0]}</Typography>
              <LinearProgressWithLabelAndMinutes
                value={score[1]}
                maxValue={maxMinutesPerWeek}
              />
            </CardContent>
          </Card>
        </>
      );
    });
  };

  return <>{BuildWeeks()}</>;
};

export default WeekSummary;
