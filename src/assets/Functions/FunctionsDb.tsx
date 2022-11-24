import axios from "axios";

export async function GetStartAttack() {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/dicts/get_start_attack`
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch (e: any) {
    console.log(e);
  }
}

export async function GetTime() {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/dicts/get_time`
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch (e: any) {
    console.log(e);
  }
}

export async function GetTimeType() {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/dicts/get_time_type`
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch (e: any) {
    console.log(e);
  }
}

export async function GetAttackType() {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/dicts/get_attack_type`
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch (e: any) {
    console.log(e);
  }
}

export async function GetLossOptions() {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/dicts/get_loss`
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch (e: any) {
    console.log(e);
  }
}

export async function GetPlayType() {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/dicts/get_play_type`
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch (e: any) {
    console.log(e);
  }
}

export async function GetFoulOptions() {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/dicts/get_faul`
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch (e: any) {
    console.log(e);
  }
}

export async function createGame(
  userId: number,
  team_a_id: number,
  team_b_id: number,
  date: string
) {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/games/create/${userId}`,
      {
        team_a_id,
        team_b_id,
        start_five_id: 1,
        date,
      }
    );
    if (res.status === 200) {
      console.log(res.data);
    }
  } catch (e: any) {
    console.log(e);
  }
}
