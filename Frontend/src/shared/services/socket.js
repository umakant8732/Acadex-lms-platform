import { io } from 'socket.io-client'

// Creates one socket client for whole frontend app.
// autoConnect false lets feature hooks decide when socket should connect.
export const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: false,
  withCredentials: true
})
