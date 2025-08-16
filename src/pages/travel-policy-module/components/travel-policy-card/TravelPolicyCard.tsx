import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Switch,
  Typography
} from '@mui/material';
import { theme } from "../../../theme";

const PolicyCard = ({
  title,
  lines = [],
  active = false,
  onToggle = () => {},
}) => {
  return (
    <Card
      sx={{
        position: 'relative',
        backgroundColor: theme.palette.customColors.lightBlue[4], // light blue
        borderRadius: 2,
        p: 2,
        minHeight: 180,
      }}
    >
      {/* Corner Tag */}
      <Box
  sx={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    borderTop: `60px solid ${theme.palette.customColors.yellow[11]}`, // color
    borderRight: '60px solid transparent',
    zIndex: 2,
  }}
>
  <Typography
    sx={{
      position: 'absolute',
      top: -45,
      left: 1,
      transform: 'rotate(-45deg)',
      fontSize: 10,
      fontWeight: 'bold',
      color: theme.palette.customColors.black[1],
      textAlign: 'center',
    }}
  >
    Default
  </Typography>
</Box>

      {/* Three-dot menu */}
      <IconButton
        size="small"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
        }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <CardContent sx={{ pt: 5 }}>
        {/* Title */}
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          {title}
        </Typography>

        {/* Details */}
        <Stack spacing={0.5}>
          {lines?.map((line, idx) => (
            <Typography
              variant="body2"
              key={idx}
              dangerouslySetInnerHTML={{ __html: line }}
              sx={{ lineHeight: 1.5 }}
            />
          ))}
        </Stack>

        {/* Toggle Section */}
        <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}>
          <Typography variant="caption" mr={1}>
            Active
          </Typography>
          <Switch size="small" checked={active} onChange={onToggle} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PolicyCard;
