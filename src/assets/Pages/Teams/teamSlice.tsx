import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User, Team } from "../../Interfaces";
import { RootState } from "../../../app/store";

type InitialState = {
  teams: Team[];
  status: string;
  error: string | null | undefined;
};

const initialState: InitialState = {
  teams: [],
  status: "idle",
  error: null,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTeams.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newTeams = action.payload.filter(
          (newTeam: Team) =>
            !state.teams.some((existingTeam) => existingTeam.id === newTeam.id)
        );
        state.teams = state.teams.concat(newTeams);
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTeamFetch.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateTeamFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedTeamId = action.meta.arg.selectedTeam.id;
        const updatedTeamName = action.meta.arg.newTeamName;
        const teamIndex = state.teams.findIndex(
          (team) => team.id === updatedTeamId
        );
        if (teamIndex !== -1) {
          const updatedTeam = {
            ...state.teams[teamIndex],
            name: updatedTeamName,
          };
          state.teams[teamIndex] = updatedTeam;
        }
      })
      .addCase(updateTeamFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTeamFetch.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteTeamFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedTeam = action.meta.arg.team.id;
        const teamIndex = state.teams.findIndex(
          (team) => team.id === deletedTeam
        );
        if (teamIndex !== -1) {
          state.teams.splice(teamIndex, 1);
        }
      })
      .addCase(deleteTeamFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTeamFetch.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addTeamFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addTeamFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const addTeamFetch = createAsyncThunk(
  "teams/addTeamFetch",
  async ({ user, teamName }: { user: User; teamName: string }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        apikey: process.env.REACT_APP_SERVER_API!,
      },
    };

    const data = {
      user_id: user.user.id,
      name: teamName,
    };

    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/rest/v1/teams`,
      data,
      config
    );
    return res.data;
  }
);

export const fetchTeams = createAsyncThunk(
  "teams/fetchTeams",
  async (user: User) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        apikey: process.env.REACT_APP_SERVER_API!,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/rest/v1/teams?select=*`,
      config
    );
    return res.data;
  }
);

export const deleteTeamFetch = createAsyncThunk(
  "teams/deleteTeam",
  async ({ user, team }: { user: User; team: Team }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        apikey: process.env.REACT_APP_SERVER_API!,
      },
    };
    const res = await axios.delete(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/rest/v1/teams?id=eq.${team.id}`,
      config
    );
    return res.data;
  }
);

export const updateTeamFetch = createAsyncThunk(
  "teams/updateTeam",
  async ({
    user,
    selectedTeam,
    newTeamName,
  }: {
    user: User;
    selectedTeam: Team;
    newTeamName: string;
  }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        apikey: process.env.REACT_APP_SERVER_API!,
      },
    };

    const data = {
      user_id: user.user.id,
      name: newTeamName,
      id: selectedTeam.id,
    };

    const res = await axios.put(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/rest/v1/teams?id=eq.${selectedTeam.id}`,
      data,
      config
    );
    return res.data;
  }
);

export const selectTeamsInfo = (state: RootState) => state.team;
export const selectTeams = (state: RootState) => state.team.teams;
export const selectTeamsStatus = (state: RootState) => state.team.status;
export default teamSlice.reducer;
