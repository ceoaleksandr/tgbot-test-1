import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"

export default async (ctx: any) => (async () => {

  /* === Send message === */

  await ctx.reply(`
    Напишите ваше сообщение. Мы ответим на него в ближайшее время
  `.replace(/^ */mg, ''), Markup.removeKeyboard())

  /* === Set step === */

  ctx.session.step = 'support:open-ticket'

})().catch((error) => nError(error, ctx))
