import axios from "axios";

import { clientEnv } from "../utils/client-env";

export const apiClientConfig = {
  baseURL: clientEnv.apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

// One creator keeps axios setup consistent if we ever need extra clients later.
export const createApiClient = () => axios.create(apiClientConfig);
