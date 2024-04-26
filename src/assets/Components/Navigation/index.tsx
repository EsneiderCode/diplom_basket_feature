import * as React from "react";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import GroupsIcon from "@mui/icons-material/Groups";

export default function BottomNavigationComponent(props: any) {
  // const [value, setValue] = React.useState("games");

  const handleChange = (event: any, newValue: React.SetStateAction<string>) => {
    // setValue(newValue);
  };

  return (
    <Box alignItems="center" display="flex" justifyContent="center">
      <BottomNavigation
        showLabels
        value={props.page}
        onChange={handleChange}
        sx={{
          width: "100%",
          maxWidth: "450px",
          height: "10vh",
          mx: "auto",
          boxShadow: "0px 0px 5px #404040",
          backgroundColor: "white",
          borderRadius: "15px 15px 0px 0px",
          position: "fixed",
          bottom: 0,
          padding: 0,
          margin: 0,
        }}
      >
        <BottomNavigationAction
          label="Настройки"
          icon={<SettingsIcon />}
          value="settings"
          href="/settings"
        />
        <BottomNavigationAction
          label="Игры"
          icon={<SportsBasketballIcon />}
          value="games"
          href="/games"
        />
        <BottomNavigationAction
          label="Команды"
          icon={<GroupsIcon />}
          value="teams"
          href="/teams"
        />
      </BottomNavigation>
    </Box>
  );
}
