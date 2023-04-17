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
import { useEffect, useState } from "react";

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

  const getAthletes = () => {
    let tempAthletes: string[] = [];
    Object.keys(athleteWeekData).forEach((e) => {
      console.log(e);
      const newAthletes = Object.keys(athleteWeekData[e]).map((e) => e);
      const athletesSet = new Set([...athletes, ...newAthletes]);
      tempAthletes = [...athletesSet];
    });

    return tempAthletes;
  };

  const [showWeek, setShowWeek] = useState<number>(0);
  const [showAthletes, setShowAthletes] = useState<string>("");

  const [weekData] = useState<{ [key: string]: number }>(
    getWeekByWeekSumDuration(data.activities)
  );
  const [athleteWeekData] = useState<any>(
    getAthleteDataPerWeek(data.activities)
  );
  const [availableWeeksForDisplay] = useState<string[]>(
    Object.keys(athleteWeekData).map((e: string) => e)
  );
  const [athletes, setAthletes] = useState<string[]>([]);

  useEffect(() => {
    setAthletes(getAthletes());
  }, []);

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
            <Grid item xs={10} />
            <Grid item xs>
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
      const AthleteCard = (
        <Card style={{ marginBottom: 10 }} variant="outlined">
          <CardContent>
            <Typography variant="h4">{score[0]}</Typography>
            <LinearProgressWithLabelAndMinutes
              value={score[1]}
              maxvalue={maxMinutesPerWeek}
            />
          </CardContent>
        </Card>
      );
      return (
        <>
          {showAthletes && showAthletes === score[0] && AthleteCard}
          {!showAthletes && AthleteCard}
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
          variant={!showWeek ? "contained" : "outlined"}
          style={{ marginRight: 10 }}
        >
          show all
        </Button>
        {availableWeeksForDisplay &&
          availableWeeksForDisplay.map((e) => {
            return (
              <>
                <Button
                  id={e}
                  onClick={() => {
                    setShowWeek(Number(e));
                  }}
                  variant={e === String(showWeek) ? "contained" : "outlined"}
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

  const AvailableAthletesActionBar: JSX.Element = (
    <Box style={{ marginTop: 20 }}>
      <Divider>
        <Typography variant="h5">Available athletes</Typography>
      </Divider>
      <Box>
        <Button
          onClick={() => {
            setShowAthletes("");
          }}
          variant={!String(showAthletes) ? "contained" : "outlined"}
          style={{ marginRight: 10 }}
        >
          show all
        </Button>
        {athletes &&
          athletes.map((e: string) => {
            return (
              <>
                <Button
                  variant={
                    e === String(showAthletes) ? "contained" : "outlined"
                  }
                  style={{ marginRight: 10 }}
                  onClick={() => setShowAthletes(e)}
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
      {AvailableAthletesActionBar}
      {weekData &&
        Object.keys(weekData).map((e) => {
          return Week(e);
        })}
    </>
  );
};

export default WeekSummary;
