declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string,
      DB_URI: string,
      DB_NAME: string,
      REDIS_HOST: string,
      REDIS_PORT: string
    }
  }
}

export { }
