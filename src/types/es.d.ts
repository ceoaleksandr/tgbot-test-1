declare global {
  interface Error extends Error {
    httpCode?: number
  }
}

export { }
