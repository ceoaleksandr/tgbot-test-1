import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"
import categories from "../../misc/categories"
import { ObjectId } from "mongodb"

export default async (ctx: any) => (async () => {

  /* === Show cart === */

  await ctx.replyWithHTML(`
    Как вас зовут?
  `.replace(/^ */mg, ''), Markup.removeKeyboard())

  ctx.session.step = 'checkout:name'

})().catch((error) => nError(error, ctx))
