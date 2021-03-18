import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"
import categories from "../../misc/categories"
import { ObjectId } from "mongodb"
import { validate } from "../../misc/validate"
import keyboard from "../../keyboards/admin-default"

export default async (ctx: SessionContext) => (async () => {

  /* === Send message === */

  await ctx.replyWithHTML(`
    Введите ник или ID пользователя
  `.replace(/^ */mg, ''), Markup.removeKeyboard())

  /* === Change state === */

  ctx.session.step = 'admin:user-info'

})().catch((error) => nError(error, ctx))
