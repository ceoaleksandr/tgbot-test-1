import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"
import categories from "../../misc/categories"
import { ObjectId } from "mongodb"
import { validate } from "../../misc/validate"
import keyboard from "../../keyboards/admin-default"

export default async (ctx: SessionContext) => (async () => {

  /* === Check if admin === */
  
  if(!(await $db.users.countDocuments({id: ctx.from?.id, isAdmin: true})))
    await ctx.replyWithHTML(`
      ❌ Вы не наделены правами администратора
    `.replace(/^ */mg, ''))

  /* === Send message === */

  await ctx.replyWithHTML(`
    Выберите действие
  `.replace(/^ */mg, ''), await keyboard(ctx))

})().catch((error) => nError(error, ctx))
