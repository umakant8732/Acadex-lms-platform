import { rm } from 'node:fs/promises'

// Removes local temp folder after successful processing.
export const removeTranscodeWorkDir = async workDir => {
  if (!workDir) {
    return
  }

  await rm(workDir, {
    recursive: true,
    force: true
  })
}
