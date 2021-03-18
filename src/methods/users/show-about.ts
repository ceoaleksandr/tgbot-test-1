import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"

export default async (ctx: SessionContext) => (async () => {

  /* === Send welcome message === */

  await ctx.reply(`
    ❔ <b>О магазине</b> ❔

    Наш онлайн-магазин предлагает вам товар в разных категориях. Здесь есть каталог, реферальная система и админка.
    
    Бот выполнен как тестовое задание
  `.replace(/^ */mg, ''), {
    parse_mode: 'HTML'
  })
})().catch((error) => nError(error, ctx))
