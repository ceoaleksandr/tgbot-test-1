import {Context} from 'telegraf'

declare global {
  interface SessionContext extends Context {
    session: any
  }
}

export { }
