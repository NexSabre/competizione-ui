enum DurationUnit {
  MINUTES = "minutes",
}

export interface ISummaryData {
  total: number;
  unit: DurationUnit | string;
}

export interface IActivityData {
  week: number;
  athlete_name: string;
  activity: string;
  duration: number;
  duration_unit: DurationUnit | string;
}

export interface ITestData {
  activities: IActivityData[];
}

const GetData: ITestData = {
  activities: [
    {
      week: 1,
      athlete_name: "Miguel",
      activity: "cycling",
      duration: 30,
      duration_unit: DurationUnit.MINUTES,
    },
    {
      week: 1,
      athlete_name: "Miguel",
      activity: "running",
      duration: 10,
      duration_unit: DurationUnit.MINUTES,
    },
    {
      week: 1,
      athlete_name: "Ivan",
      activity: "running",
      duration: 23,
      duration_unit: DurationUnit.MINUTES,
    },
    {
      week: 2,
      athlete_name: "Miguel",
      activity: "cycling",
      duration: 10,
      duration_unit: DurationUnit.MINUTES,
    },
    {
      week: 2,
      athlete_name: "Ernie",
      activity: "cycling",
      duration: 40,
      duration_unit: DurationUnit.MINUTES,
    },
  ],
};

export default GetData;
