let ioInstance = null

// Stores Socket.IO server instance for app-wide emits.
export const setSocketServer = io => {
  ioInstance = io
}

// Returns active Socket.IO server instance.
export const getSocketServer = () => {
  if (!ioInstance) {
    throw new Error('Socket server is not initialized')
  }

  return ioInstance
}
