// import {
//   Card,
//   CardHeader,
//   Avatar,
//   CardContent,
//   Typography,
//   Box,
//   LinearProgress,
//   LinearProgressProps,
//   Icon,
// } from "@mui/material";
// import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
// import { red } from "@mui/material/colors";
// import { DirectionsRun } from "@mui/icons-material";

// const Icons = (name: string) => {
//   switch (name) {
//     case "cycling":
//       return <DirectionsBikeIcon />;
//     case "running":
//       return <DirectionsRun />;
//   }
// };

// function LinearProgressWithIcon(
//   props: LinearProgressProps & { value: number; iconName: string }
// ) {
//   return (
//     <Box sx={{ display: "flex", alignItems: "center" }}>
//       <Box>{Icons(props.iconName)}</Box>
//       <Box sx={{ width: "100%", mr: 1 }}>
//         <Typography variant="body2">{props.iconName}</Typography>
//         <LinearProgress variant="determinate" {...props} />
//       </Box>
//       <Box sx={{ minWidth: 35 }}>
//         <Typography variant="body2" color="text.secondary">{`${Math.round(
//           props.value
//         )}%`}</Typography>
//       </Box>
//     </Box>
//   );
// }

// const Athlete = () => {
//   return (
//     <Card style={{ marginTop: "50px" }} variant="outlined">
//       <CardHeader
//         avatar={
//           <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//             NS
//           </Avatar>
//         }
//         title="Nex Sabre"
//         subheader="Favorite activity: cycling"
//       />

//       <CardContent>
//         <Typography variant="h5">20 minutes!</Typography>
//         <LinearProgressWithIcon value={80} iconName="cycling" />
//         <LinearProgressWithIcon value={20} iconName="running" />
//       </CardContent>
//     </Card>
//   );
// };

// export default Athlete;
