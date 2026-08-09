import { io } from "socket.io-client";

import { clientEnv } from "./client-env";

export const socketClientConfig = {
  autoConnect: false,
  withCredentials: true,
  transports: ["websocket", "polling"],
};

// One creator keeps socket setup reusable and avoids config duplication later.
export const createSocketClient = () =>
  io(clientEnv.socketUrl, socketClientConfig);
