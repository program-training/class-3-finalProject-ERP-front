import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import AllProductsGraph from "./StatisticsAllProductsPage";
import RegisteredStatistics from "./RegisteredStatistics";

export const MainStatisticsPage = () => {
  const [value, setValue] = useState("1");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  //   const renderErrorMessage = () => (!Error ? <MessageError /> : null);

  return (
    <TabContext value={value}>
      {/* {renderErrorMessage()} */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label=" All Products" value="1" />
          <Tab label="Registered" value="2" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <AllProductsGraph />
      </TabPanel>
      <TabPanel value="2">
        <RegisteredStatistics />
      </TabPanel>
    </TabContext>
  );
};
