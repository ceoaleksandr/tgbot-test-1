import { Context, Markup } from "telegraf"
import { nError, $db } from "../funcs"
import keyboard from "../keyboards/default"

export default async (ctx: SessionContext) => (async () => {

  /* === Set state === */

  ctx.session.step = 'from-menu'

  /* === Send welcome message === */

  await ctx.reply(`
    Выберите действие
  `.replace(/^ */mg, ''), await keyboard(ctx))
})().catch((error) => nError(error, ctx))
