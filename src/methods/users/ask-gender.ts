import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"

export default async (ctx: SessionContext) => (async () => {

  /* === Set state === */

  ctx.session.step = "registering:age"

  /* === Send welcome message === */

  await ctx.reply(`
    Укажи свой пол:
  `.replace(/^ */mg, ''), Markup.keyboard([

    /* === Send buttons === */

    '👨 Мужской', '👩 Женский'
  ], {
    columns: 2
  }).resize())
})().catch((error) => nError(error, ctx))
