import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"
import categories from "../../misc/categories"
import { ObjectId } from "mongodb"
import {validate} from "../../misc/validate"

export default async (ctx: any) => (async () => {

  const name = ctx.update.message.text

  /* === Validate === */

  if(validate('name', name))
    return ctx.replyWithHTML('Пожалуйста, введите настоящее имя')

  /* === Show cart === */

  await ctx.replyWithHTML(`
    Укажите ваш номер телефона, начиная с +7...

    Номер должен быть без пробелов, скобок и других символов
  `.replace(/^ */mg, ''))

  ctx.session.step = 'checkout:phone'

})().catch((error) => nError(error, ctx))
