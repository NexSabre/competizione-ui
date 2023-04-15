import {
  Typography,
  Grid,
  Divider,
  Card,
  CardContent,
  Box,
  Button,
} from "@mui/material";
import GetData, { IActivityData } from "../../data";
import LinearProgressWithLabelAndMinutes from "../LinearProgressWithLabel";
import SchwartzianTransform from "../../schwartzianTransform";
import { useState } from "react";

const getWeekByWeekSumDuration = (
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

interface IAthleteDataPerWeek {}

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
  const weekData: { [key: string]: number } = getWeekByWeekSumDuration(
    data.activities
  );

  const athleteWeekData = getAthleteDataPerWeek(data.activities);
  const availableWeeksForDisplay: Array<string> = Object.keys(
    athleteWeekData
  ).map((e) => e);

  const [showWeek, setShowWeek] = useState<number>(0);

  const Week = (e: any) => {
    const WeekElement = (weekNumber: string) => {
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
              Week {weekNumber}
            </Typography>
          </Divider>
          <Grid container alignItems="center">
            <Grid item xs></Grid>
            <Grid item>
              <Typography gutterBottom variant="h6" component="div">
                Total: {weekData[weekNumber as string]} minutes
              </Typography>
            </Grid>
          </Grid>

          {AthleteCards(weekNumber, weekData[weekNumber])}
        </>
      );
    };
    if (showWeek === 0) {
      return WeekElement(e);
    } else if (showWeek > 0 && showWeek === Number(e)) {
      return WeekElement(e);
    }
  };

  const AthleteCards = (weekNumber: any, maxMinutesPerWeek: number) => {
    // sort a dict
    athleteWeekData[weekNumber] = SchwartzianTransform(
      athleteWeekData[weekNumber]
    );

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

  const AvailableWeeksActionBar: JSX.Element = (
    <Box style={{ marginTop: 20 }}>
      <Divider>
        <Typography variant="h5">Available weeks</Typography>
      </Divider>
      <Box>
        <Button
          onClick={() => {
            setShowWeek(0);
          }}
        >
          show all
        </Button>
        {availableWeeksForDisplay.map((e) => {
          return (
            <>
              <Button
                id={e}
                onClick={() => {
                  setShowWeek(Number(e));
                }}
                variant={"outlined"}
                style={{ marginRight: 10 }}
              >
                {e}
              </Button>
            </>
          );
        })}
      </Box>
    </Box>
  );
  return (
    <>
      {AvailableWeeksActionBar}
      {Object.keys(weekData).map((e) => {
        return Week(e);
      })}
    </>
  );
};

export default WeekSummary;
