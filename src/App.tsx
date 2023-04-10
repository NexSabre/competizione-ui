import { Grid } from "@mui/material";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Grid container spacing={3}>
      <Grid xs></Grid>
      <Grid xs={10} style={{ minWidth: "300px" }}>
        <Dashboard />
      </Grid>
      <Grid xs></Grid>
    </Grid>
  );
}

export default App;
