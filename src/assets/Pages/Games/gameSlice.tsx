import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User, Player, Team, PlayerTeam, Game } from "../../Interfaces";
import { RootState } from "../../../app/store";

type InitialState = {
  games: Game[];
  status: string;
  error: string | null | undefined;
};

export interface CreateGame {
  date: string;
  team_a: string;
  team_b: string;
  game_name: string;
}

interface UpdateGame {
  user_id: number;
  name: string;
  id: number;
}

const initialState: InitialState = {
  games: [],
  status: "idle",
  error: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGames.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = "succeeded";
        // const newPlayers = action.payload.filter(
        //   (newPlayer: PlayerTeam) =>
        //     !state.players.some(
        //       (existingPlayer) => existingPlayer.id === newPlayer.id
        //     )
        // );
        // state.players = state.players.concat(newPlayers);
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateGameFetch.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateGameFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        //const updatedTeamId = action.meta.arg.data.id;
        //const updatedTeamName = action.meta.arg.data.name;
        // const teamIndex = state.players.findIndex(
        //   (player: PlayerTeam) => player.id === updatedTeamId
        // );
        // if (teamIndex !== -1) {
        //   const updatedTeam = {
        //     ...state.players[teamIndex],
        //     name: updatedTeamName,
        //   };
        //   state.players[teamIndex] = updatedTeam;
        // }
      })
      .addCase(updateGameFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteGameFetch.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteGameFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        //const deletedPlayerId = action.meta.arg.player.id;
        // const teamIndex = state.players.findIndex(
        //   (player) => player.id === deletedPlayerId
        // );
        // if (teamIndex !== -1) {
        //   state.players.splice(teamIndex, 1);
        // }
      })
      .addCase(deleteGameFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addGameFetch.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addGameFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addGameFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const addGameFetch = createAsyncThunk(
  "games/addGameFetch",
  async ({ user, data }: { user: User; data: CreateGame }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        apikey: process.env.REACT_APP_SERVER_API!,
      },
    };

    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/rest/v1/games`,
      data,
      config
    );

    return res.data;
  }
);

export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async ({ user }: { user: User }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        apikey: process.env.REACT_APP_SERVER_API!,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/rest/v1/games?select=*`,
      config
    );
    return res.data;
  }
);

export const deleteGameFetch = createAsyncThunk(
  "games/deleteGameFetch",
  async ({ user, player }: { user: User; player: PlayerTeam }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        apikey: process.env.REACT_APP_SERVER_API!,
      },
    };
    const res = await axios.delete(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/rest/v1/games?id=eq.${player.id}`,
      config
    );
    return res.data;
  }
);

export const updateGameFetch = createAsyncThunk(
  "games/updateGame",
  async ({ user, data }: { user: User; data: UpdateGame }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        apikey: process.env.REACT_APP_SERVER_API!,
      },
    };

    const res = await axios.put(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/rest/v1/games?id=eq.${data.id}`,
      data,
      config
    );
    return res.data;
  }
);

export const selectGamesInfo = (state: RootState) => state.game;
export const selectGames = (state: RootState) => state.game.games;
export const selectGamesStatus = (state: RootState) => state.game.status;
export default gameSlice.reducer;
