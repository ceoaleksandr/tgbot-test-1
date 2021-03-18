import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"
import categories from "../../misc/categories"
import { ObjectId } from "mongodb"
import { validate } from "../../misc/validate"
import keyboard from "../../keyboards/default"

export default async (ctx: any) => (async () => {

  ctx.session.broadcast = {}

  /* === Send message === */

  await ctx.replyWithHTML(`
    Выберите пол аудитории:
  `.replace(/^ */mg, ''), Markup.keyboard([
    'Мужской',
    'Женский',
    'Любой'
  ]).resize())

  ctx.session.step = 'admin:broadcast:gender'

})().catch((error) => nError(error, ctx))
