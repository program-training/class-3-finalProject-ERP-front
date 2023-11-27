import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useState } from "react";

export const MessageError = () => {
  const [networkError, setNetworkError] = useState<boolean>(false);

  if (!networkError) {
    setTimeout(() => {
      setNetworkError(true);
    }, 7000);
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  } else {
    return (
      <div className="waiting">
        <Typography variant="h4" color="error" id="messageError">
          Network error
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.reload()}
        >
          reload
        </Button>
      </div>
    );
  }
};
