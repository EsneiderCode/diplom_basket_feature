import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User, Team, Game, CreateAction, Action } from "../../Interfaces";
import { RootState } from "../../../app/store";

type InitialState = {
  actions: Action[];
  status: string;
  error: string | null | undefined;
};

const initialState: InitialState = {
  actions: [],
  status: "idle",
  error: null,
};

const actionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchActions.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchActions.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newActions = action.payload.filter(
          (action: Action) =>
            !state.actions.some(
              (existingAction: Action) => existingAction.id === action.id
            )
        );
        state.actions = state.actions.concat(newActions);
      })
      .addCase(fetchActions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addActionFetch.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addActionFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addActionFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const addActionFetch = createAsyncThunk(
  "actions/addActionFetch",
  async ({ user, data }: { user: User; data: CreateAction }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        apikey: process.env.REACT_APP_SERVER_API,
      },
    };

    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/rest/v1/actions`,
      data,
      config
    );
    return res.data;
  }
);

export const fetchActions = createAsyncThunk(
  "actions/fetchActions",
  async ({ user, gameId }: { user: User; gameId: string }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        apikey: process.env.REACT_APP_SERVER_API!,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/rest/v1/actions?select=*&game_id=eq.${gameId}`,
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

export const deleteActionFetch = createAsyncThunk(
  "actions/deleteAction",
  async ({ user, team }: { user: User; team: Team }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        apikey: process.env.REACT_APP_SERVER_API!,
      },
    };
    const res = await axios.delete(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/rest/v1/actions?id=eq.${team.id}`,
      config
    );
    return res.data;
  }
);

export const selectActionsInfo = (state: RootState) => state.action;
export const selectActions = (state: RootState) => state.action.actions;
export const selectActionsStatus = (state: RootState) => state.action.status;
export default actionSlice.reducer;
