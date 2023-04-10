import { Box } from "@mui/material";
import DashboardSummary from "./components/dashboard/Summary";
import WeekSummary from "./components/dashboard/WeekSummary";

const Dashboard = () => {
  return (
    <Box>
      <DashboardSummary />
      <WeekSummary />
    </Box>
  );
};

export default Dashboard;
