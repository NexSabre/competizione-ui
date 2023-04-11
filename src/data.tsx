enum DurationUnit {
  MINUTES = "minutes",
  HOURS = "hours",
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
  summary: ISummaryData;
  activities: IActivityData[];
}

const GetData: ITestData = {
  summary: {
    total: 1700,
    unit: "minutes",
  },
  activities: [
    {
      week: 1,
      athlete_name: "Nex Sabre",
      activity: "cycling",
      duration: 30,
      duration_unit: "minutes",
    },
    {
      week: 1,
      athlete_name: "Nex Sabre",
      activity: "running",
      duration: 10,
      duration_unit: DurationUnit.MINUTES,
    },
    {
      week: 2,
      athlete_name: "Nex Sabre",
      activity: "cycling",
      duration: 10,
      duration_unit: DurationUnit.MINUTES,
    },
  ],
};

export default GetData;
