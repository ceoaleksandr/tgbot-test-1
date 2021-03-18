import { Context } from "telegraf"
import { nError } from "../funcs"

export default async (ctx: SessionContext) => (async () => {
  
  const count = (ctx.session.count || 0) + 1

  await ctx.reply(`
    Counted ${count} times
  `.replace(/^ */mg, ''))

  ctx.session.count = count
})().catch((error) => nError(error, ctx))
