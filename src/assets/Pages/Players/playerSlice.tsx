import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User, Player, Team, PlayerTeam } from "../../Interfaces";
import { RootState } from "../../../app/store";

interface CreatePlayer {
  user_id: number;
  team_id: string;
  number: number;
  first_name: string;
  name: string;
  father_name: string;
}

interface UpdatePlayer {
  user_id: number;
  name: string;
  id: number;
}

type InitialState = {
  players: PlayerTeam[];
  status: string;
  error: string | null | undefined;
};

const initialState: InitialState = {
  players: [],
  status: "idle",
  error: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPlayers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newPlayers = action.payload.filter(
          (newPlayer: PlayerTeam) =>
            !state.players.some(
              (existingPlayer) => existingPlayer.id === newPlayer.id
            )
        );
        state.players = state.players.concat(newPlayers);
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updatePlayerFetch.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updatePlayerFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedTeamId = action.meta.arg.data.id;
        const updatedTeamName = action.meta.arg.data.name;
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
      .addCase(updatePlayerFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePlayerFetch.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deletePlayerFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedPlayerId = action.meta.arg.player.id;
        // const teamIndex = state.players.findIndex(
        //   (player) => player.id === deletedPlayerId
        // );
        // if (teamIndex !== -1) {
        //   state.players.splice(teamIndex, 1);
        // }
      })
      .addCase(deletePlayerFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPlayerFetch.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addPlayerFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addPlayerFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const addPlayerFetch = createAsyncThunk(
  "players/addPlayerFetch",
  async ({ user, data }: { user: User; data: CreatePlayer }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        apikey: process.env.REACT_APP_SERVER_API!,
      },
    };

    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/rest/v1/players`,
      data,
      config
    );

    return res.data;
  }
);

export const fetchPlayers = createAsyncThunk(
  "players/fetchPlayers",
  async ({ user, team }: { user: User; team: Team }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        apikey: process.env.REACT_APP_SERVER_API!,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/rest/v1/players?select=*&team_id=eq.${team.id}`,
      config
    );
    return res.data;
  }
);

export const deletePlayerFetch = createAsyncThunk(
  "players/deletePlayerFetch",
  async ({ user, player }: { user: User; player: PlayerTeam }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        apikey: process.env.REACT_APP_SERVER_API!,
      },
    };
    const res = await axios.delete(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/rest/v1/players?id=eq.${player.id}`,
      config
    );
    return res.data;
  }
);

export const updatePlayerFetch = createAsyncThunk(
  "players/updatePlayer",
  async ({ user, data }: { user: User; data: UpdatePlayer }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        apikey: process.env.REACT_APP_SERVER_API!,
      },
    };

    const res = await axios.put(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/rest/v1/players?id=eq.${data.id}`,
      data,
      config
    );
    return res.data;
  }
);

export const selectPlayersInfo = (state: RootState) => state.player;
export const selectPlayers = (state: RootState) => state.player.players;
export const selectPlayersStatus = (state: RootState) => state.player.status;
export default playerSlice.reducer;
