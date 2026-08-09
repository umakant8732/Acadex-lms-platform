import { createSocketClient } from "./create-socket-client";

// Shared socket instance used by feature hooks.
// Hooks decide when to connect, disconnect, and join rooms.
export const socket = createSocketClient();
