import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"
import categories from "../../misc/categories"
import { ObjectId } from "mongodb"
import { validate } from "../../misc/validate"
import keyboard from "../../keyboards/default"

export default async (ctx: any) => (async () => {

  const text = ctx.update.message.text

  const gender = text.toLowerCase() === 'мужской' ? 'male' : text.toLowerCase() === 'женский' ? 'female' : ''

  /* === Send message === */

  await ctx.replyWithHTML(`
    Выберите возраст аудитории:
  `.replace(/^ */mg, ''), Markup.keyboard([
    '18-20',
    '20-30',
    '30+',
    'Любой'
  ]).resize())

  ctx.session.step = 'admin:broadcast:age'
  ctx.session.broadcast.gender = gender

})().catch((error) => nError(error, ctx))
