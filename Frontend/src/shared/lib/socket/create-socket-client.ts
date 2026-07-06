import { io, type ManagerOptions, type Socket, type SocketOptions } from 'socket.io-client'

import { clientEnv } from '../utils/client-env'

export const socketClientConfig: Partial<ManagerOptions & SocketOptions> = {
  autoConnect: false,
  withCredentials: true,
  transports: ['websocket', 'polling']
}

// One creator keeps socket setup reusable and avoids config duplication later.
export const createSocketClient = (): Socket => io(clientEnv.socketUrl, socketClientConfig)
