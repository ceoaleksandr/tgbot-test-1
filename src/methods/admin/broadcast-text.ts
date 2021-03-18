import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"
import categories from "../../misc/categories"
import { ObjectId } from "mongodb"
import { validate } from "../../misc/validate"
import keyboard from "../../keyboards/default"

export default async (ctx: any) => (async () => {

  const text = ctx.update.message.text
  const age = text.toLowerCase() !== 'любой' ? text : ''

  /* === Send message === */

  await ctx.replyWithHTML(`
    Напишите текст, который нужено разослать
  `.replace(/^ */mg, ''), Markup.removeKeyboard())

  ctx.session.step = 'admin:broadcast:text'
  ctx.session.broadcast.age = age

})().catch((error) => nError(error, ctx))
