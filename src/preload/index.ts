import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer

const radiusApi = {
  onKeyDown: (callback: (value: number) => null) =>
    ipcRenderer.on('key-down', (_event, value: number) => callback(value)),
  onKeyUp: (callback: (value: number) => null) =>
    ipcRenderer.on('key-up', (_event, value: number) => callback(value))
}
export type radiusApiType = typeof radiusApi

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    // contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('radiusApi', radiusApi)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  // window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.radiusApi = radiusApi
}
