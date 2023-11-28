import SignIn from "./SignIn/SignIn";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SignUpForm from "./SignUp/SignUpForm";
import { TabPanelProps } from "../types";

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
export default function LoginAndRegistration() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab label="SIGN IN" {...a11yProps(0)} />
          <Tab label="SIGN UP" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <SignIn />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <SignUpForm />
      </TabPanel>
    </>
  );
}
