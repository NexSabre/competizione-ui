import {
  AppBar,
  Box,
  CssBaseline,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" style={{ background: "black" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          ></IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            🏁 Competizione
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3}>
        <Grid item xs></Grid>
        <Grid item xs={8} style={{ minWidth: "300px", maxWidth: 1000 }}>
          <Dashboard />
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </Box>
  );
}

export default App;
