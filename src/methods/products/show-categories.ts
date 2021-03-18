import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"
import categories from "../../misc/categories"

export default async (ctx: any) => (async () => {

  /* === Send welcome message === */

  await ctx.reply(`
    Выберите категорию:
  `.replace(/^ */mg, ''), Markup.keyboard(categories.concat('Назад'), {
    columns: 2
  }).resize())

  /* === Set state === */

  ctx.session.step = 'products:categories'

})().catch((error) => nError(error, ctx))
