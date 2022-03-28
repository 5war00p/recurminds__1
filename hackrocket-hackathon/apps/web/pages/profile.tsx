import { Password } from "@mui/icons-material";
import {
  Box,
  Container,
  Input,
  TextField,
  Typography,
  FormGroup,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AppTopBar from "../components/app-bar";
import { interceptedAxios } from "../intrerceptors";

const PlatformInput = ({
  index,
  onPressRemove,
  platform,
  onChangePlatform,
}: {
  index: string | number;
  onPressRemove: (index: string | number) => void;
  platform: Platform;
  onChangePlatform: (
    index: string | number,
    platform: string | null,
    value: string | null
  ) => void;
}) => {
  const platforms = ["Github", "Codeforces", "Hackerrank"];
  return (
    <Box>
      <FormControl
        style={{
          flexDirection: "row",
          marginLeft: index == "0" ? "" : "150px",
          marginTop: "20px",
        }}
      >
        <InputLabel id="subject-label">Choose Platform</InputLabel>
        <Select
          labelId="subject-label"
          placeholder="Choose Platform"
          label={"Choose Platform"}
          style={{ width: 300, marginRight: 20 }}
          value={platform.platform}
          onChange={(e) =>
            onChangePlatform(index, e.target.value, platform.value)
          }
        >
          {platforms.map((platform, index) => {
            return (
              <MenuItem value={platform} key={index}>
                {platform}
              </MenuItem>
            );
          })}
        </Select>
        <TextField
          label="Platform Username"
          placeholder="Enter Username"
          style={{ marginRight: 20, width: 300 }}
          value={platform.value}
          onChange={(e) =>
            onChangePlatform(index, platform.platform, e.target.value)
          }
        />
        {index != "0" && (
          <Button onClick={() => onPressRemove(index)}>Remove</Button>
        )}
      </FormControl>
    </Box>
  );
};

function Profile() {
  const router = useRouter();
  const [isEdit, setisEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [platformData, setPlatformData] = useState<Platforms>({
    "0": { platform: "", value: "" },
  });
  const [currentPlatformCount, setCurrentPlatformCount] = useState(0);
  useEffect(() => {
    if (router.isReady) {
      const { edit } = router?.query;
      if (edit && edit === "true") {
        setisEditing(true);
      }
    }
  }, [router]);

  useEffect(() => {
    if (router.isReady) {
      const call = async () => {
        const username = window && localStorage.getItem("username");
        try {
          const req = await interceptedAxios.get(`profile/`, {
            withCredentials: true,
          });
          if (req.status === 200) {
            const { platform_profiles } = req.data?.data;
            setEmail(req?.data?.data?.profile?.email);
            setUsername(req?.data?.data?.profile?.username);
          }
        } catch (error) {
          console.log(error);
        }
      };
      call();
    }
  }, [isEdit, router.isReady]);

  const onChangePlatform = (
    index: string | number,
    platform: string,
    value: string
  ) => {
    const copyPlatformData = { ...platformData };
    if (Object.keys(copyPlatformData).includes(index.toString())) {
      copyPlatformData[index] = { platform: platform, value: value };
      setPlatformData(copyPlatformData);
    }
  };
  const AddPlatformInput = () => {
    if (currentPlatformCount >= 2) {
      return;
    }
    const index = (currentPlatformCount + 1).toString();
    const copyPlatformData = platformData;
    copyPlatformData[index] = { platform: "", value: "" };
    setPlatformData(copyPlatformData);
    setCurrentPlatformCount(parseInt(index));
  };

  const RemovePlatformInput = (index: string | number) => {
    const count = currentPlatformCount;
    const copyPlatformData = platformData;
    delete copyPlatformData[index.toString()];
    setPlatformData(copyPlatformData);
    setCurrentPlatformCount(count - 1);
  };
  const onSubmit = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AppTopBar currentPath={"/profile"} />
      <Container>
        <Typography variant="h4" mt={"20px"}>
          {isEdit ? "Edit Profile" : "View Profile"}
        </Typography>
        <FormControl>
          <Box
            style={{
              marginTop: "30px",
              display: "flex",
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              flexDirection: "column",
            }}
          >
            <FormGroup style={{ flexDirection: "row", marginBottom: 25 }}>
              <Typography style={{ marginTop: 12, marginRight: 20 }}>
                Personal Details:{" "}
              </Typography>
              <TextField
                placeholder="Edit Email"
                value={email}
                style={{ width: 300, marginRight: 20 }}
                required
                label="Edit Email"
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEdit}
              />
              <TextField
                placeholder="Edit Username"
                value={username}
                style={{ width: 300, marginRight: 20 }}
                required
                label="Edit Username"
                disabled={!isEdit}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup style={{ flexDirection: "row" }}>
              <Typography style={{ marginTop: 12, marginRight: 20 }}>
                Platform Details:{" "}
              </Typography>
              {Object.keys(platformData || []).map((platform, index) => {
                return (
                  index < 3 && (
                    <PlatformInput
                      onPressRemove={RemovePlatformInput}
                      key={index}
                      index={index}
                      platform={platformData[index]}
                      onChangePlatform={onChangePlatform}
                    />
                  )
                );
              })}
            </FormGroup>
          </Box>
        </FormControl>
      </Container>
      <Container>
        <Button
          style={{
            marginTop: 10,
          }}
          onClick={AddPlatformInput}
        >
          Add Another
        </Button>
      </Container>
      <Container
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Button
          style={{ width: 400 }}
          onClick={onSubmit}
          variant={"contained"}
          disableRipple
        >
          Submit
        </Button>
      </Container>
    </>
  );
}

export default Profile;
