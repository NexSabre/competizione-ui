import {
  LinearProgressProps,
  Box,
  LinearProgress,
  Typography,
} from "@mui/material";

export const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number; maxvalue: number }
) => {
  const _maxValue: number = (props.value / props.maxvalue) * 100;
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          value={(props.value / props.maxvalue) * 100}
          style={{ height: 10 }}
        />
      </Box>
      {_maxValue > 0 && (
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            _maxValue
          )}%`}</Typography>
        </Box>
      )}
    </Box>
  );
};

const LinearProgressWithLabelAndMinutes = (
  props: LinearProgressProps & { value: number; maxvalue: number }
) => {
  const _maxValue: number = (props.value / props.maxvalue) * 100;
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box style={{ minWidth: 200 }}>
        <Typography variant="h5" style={{ fontStyle: "italic" }}>
          {props.value} minutes
        </Typography>
      </Box>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          value={(props.value / props.maxvalue) * 100}
          style={{ height: 10 }}
        />
      </Box>
      {_maxValue > 0 && (
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            _maxValue
          )}%`}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default LinearProgressWithLabelAndMinutes;
