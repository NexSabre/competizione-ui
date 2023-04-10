enum DurationUnit {
  MINUTES = "minutes",
  HOURS = "hours",
}

interface SummaryData {
  total: number;
  unit: DurationUnit;
}

interface ActivityData {
  week: number;
  athlete_name: string;
  activity: string;
  duration: number;
  duration_unit: DurationUnit;
}

interface TestData {
  summary: SummaryData;
  activities: ActivityData[];
}

const TestData = {
  summary: {
    total: 1700,
    unit: "minutes",
  },
  activites: [
    {
      week: 1,
      athelte_name: "Nex Sabre",
      activity: "cycling",
      duration: 30,
      duration_unit: "minutes",
    },
  ],
};

export default TestData;
