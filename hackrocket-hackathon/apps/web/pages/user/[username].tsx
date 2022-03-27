import {
  Box,
  CircularProgress,
  Container,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AppTopBar from "../../components/app-bar";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

function UserProfile() {
  const router = useRouter();
  const [value, setValue] = React.useState(0);
  const [username, setUsername] = useState("");
  const [githubData, setGithubData] = useState({});
  const [hackerRankData, setHackerRankData] = useState({});
  const [codeforcesData, setCodeForcesData] = useState({});
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    if (router.isReady) {
      const { username: queryUsername } = router?.query;
      if (queryUsername && typeof queryUsername === "string") {
        setUsername(queryUsername?.toString());
      }
    }
  }, [router]);
  const onChange = (e: any, val: number) => {
    setValue(val);
  };

  useEffect(() => {
    if (value === 0) {
      setIsloading(true);
    }
  }, [value]);

  return (
    <>
      <AppTopBar currentPath={"/home"} />
      <Container style={{ marginTop: 40 }}>
        <Box
          width={"100%"}
          sx={{ width: "100%" }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Tabs value={value} onChange={onChange}>
            <Tab label={"Github"} {...a11yProps(0)} />
            <Tab label={"HackerRank"} {...a11yProps(1)} />
            <Tab label={"CodeForces"} {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Box>
              <Typography>
                Github Username: {JSON.stringify(githubData)}
              </Typography>
            </Box>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          Hackerrank Stats
        </TabPanel>
        <TabPanel value={value} index={2}>
          Github Stats
        </TabPanel>
      </Container>
    </>
  );
}

export default UserProfile;
