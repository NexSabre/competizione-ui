import {
  Typography,
  Grid,
  Divider,
  Card,
  CardContent,
  CardActions,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Modal,
  Fade,
} from "@mui/material";
import GetData, { IActivityData } from "../../data";
import LinearProgressWithLabelAndMinutes from "../LinearProgressWithLabel";
import SchwartzianTransform from "../../schwartzianTransform";
import { useEffect, useState } from "react";

interface IActivitiesDetailsModal {
  week: number;
  athlete: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

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

  const [activitiesDetailsModal, showActivitiesDetailsModal] =
    useState<IActivitiesDetailsModal | null>();

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

    return Object.entries(athleteWeekData[weekNumber]).map(
      (score: any, idx) => {
        const AthleteCard = (
          <Card style={{ marginBottom: 10 }} variant="outlined">
            <CardContent>
              <Typography variant="h4">{score[0]}</Typography>
              <LinearProgressWithLabelAndMinutes
                value={score[1]}
                maxvalue={maxMinutesPerWeek}
              />
            </CardContent>
            <CardActions>
              <Button
                onClick={() => {
                  showActivitiesDetailsModal({
                    week: weekNumber,
                    athlete: score[0],
                  });
                }}
              >
                Show activities
              </Button>
            </CardActions>
          </Card>
        );
        return (
          <>
            {showAthletes && showAthletes === score[0] && AthleteCard}
            {!showAthletes && AthleteCard}
          </>
        );
      }
    );
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
          availableWeeksForDisplay.map((e, idx: number) => {
            return (
              <>
                <Button
                  id={String(idx)}
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
          athletes.map((e: string, idx: number) => {
            return (
              <>
                <Button
                  id={String(idx)}
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

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={Boolean(activitiesDetailsModal)}
        onClose={() => {
          showActivitiesDetailsModal(null);
        }}
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Card sx={style}>
          <CardContent>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {activitiesDetailsModal?.athlete} activities at week no.{" "}
              {activitiesDetailsModal?.week}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <List>
                {data &&
                  activitiesDetailsModal &&
                  data.activities
                    .filter((activity: IActivityData) => {
                      return Boolean(
                        activity.week == activitiesDetailsModal?.week &&
                          activity.athlete_name ==
                            activitiesDetailsModal?.athlete
                      );
                    })
                    .map((e: IActivityData, idx: number) => {
                      const primaryText: string = `${idx + 1}: ${e.activity} (${
                        e.duration
                      } minutes)`;
                      return (
                        <>
                          {" "}
                          <ListItem id={String(idx)}>
                            <ListItemText
                              primary={primaryText}
                              secondary={e.date ? e.date : null}
                            />
                          </ListItem>
                        </>
                      );
                    })}
              </List>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => {
                showActivitiesDetailsModal(null);
              }}
            >
              Close
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </>
  );
};

export default WeekSummary;
