import axios from "@/lib/axios";

const USER_ENDPOINT = "/user";


export async function isUserNameTaken(data: any): Promise<boolean> {
  try {
    const response = await axios.put(`${USER_ENDPOINT}/is-login-okay-for-me`, data);
    return response.data;
  } catch (error) {
    return false;
  }
}

export async function updateProfileAPI(data: any): Promise<void> {

  //const isTaken = await isUserNameTaken({login: String(data.login)});

  //console.log(isTaken);
  //if (isTaken) {
  return axios
    .put(`${USER_ENDPOINT}/update-profile`, data)
    .then((resp : any) => resp.data);
  //}
  /* else {
    throw new Error("Username has taken");
  } */
}
