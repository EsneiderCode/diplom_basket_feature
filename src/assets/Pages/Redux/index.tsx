import React, { useState } from "react";
import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";

type Action = {
  type: string;
  payload: string;
};

type Value = {
  value: number;
};

export default function Redux() {
  const initialV: Value = { value: 0 };

  function counterReducer(state = initialV, action: Action) {
    if (action.type == "counter/increment") {
      return {
        ...state,
        value: state.value + 1,
      };
    } else {
      return state;
    }
  }
  const store = configureStore({ reducer: counterReducer });
  store.dispatch(increment());

  function increment() {
    return { type: "counter/increment" };
  }

  //Selectors
  const selectCounterValue = (state: Value) => state.value;
  const getCurrentValue = selectCounterValue(store.getState());

  return (
    <div className="redux-container">
      <h1>Testing</h1>
      {/* <p>{store.getState()}</p> */}
    </div>
  );
}
