import { Button, Typography } from "@mui/material";
import { useState } from "react";

export const MessageError = () => {
    const [networkError, setNetworkError] = useState<boolean>(false);

    if (!networkError) {
        setTimeout(() => {
          setNetworkError(true);
        }, 7000);
        return (
          <div className="waiting">
            <img id="waitingImg" src="../../public/await.gif" alt="await" />
          </div>
        );
      } else {
        return (
          <div className="waiting">
            <div id="reload">
              <Typography variant="h6" color="error" id="messageError">
                Network error
              </Typography>
              <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
                Reload
              </Button>
            </div>
          </div>
        );
      }
}