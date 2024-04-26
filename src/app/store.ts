import { configureStore } from "@reduxjs/toolkit";
import playersReducer from "../assets/Pages/Players/playerSlice";
import teamsReducer from "../assets/Pages/Teams/teamSlice";
import gamesReducer from "../assets/Pages/Games/gameSlice";

export const store = configureStore({
  reducer: {
    team: teamsReducer,
    player: playersReducer,
    game: gamesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
