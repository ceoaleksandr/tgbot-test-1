import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"
import {validate} from "../../misc/validate"
import keyboard from "../../keyboards/default"

export default async (ctx: any) => (async () => {

  const {text} = ctx.update.message

  if(validate('comment', text)) {
    return await ctx.reply(`
      Попробуйте перефразировать свою мысль
  `.replace(/^ */mg, ''))
  }

  /* === Send message === */

  await ctx.reply(`
    Спасибо! Мы рассмотрим Ваш вопрос в ближайшее время
  `.replace(/^ */mg, ''), await keyboard(ctx))

})().catch((error) => nError(error, ctx))
