import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"
import categories from "../../misc/categories"
import { ObjectId } from "mongodb"

export default async (ctx: any) => (async () => {

  if(!ctx.session.cart.length)
    return ctx.reply('Корзина пуста')

  /* === Fetch products === */

  const products = await $db.products.find({_id: {$in: ctx.session.cart.map((product: string) => new ObjectId(product))} }).toArray()

  /* === Calculate price === */

  let cost: number = 0

  products.forEach((product: any) => cost += product.price)

  /* === Show cart === */

  await ctx.replyWithHTML(`
    <b>Ваша корзина:</b>

    ${products.map((product: any) => `\
      <b>${product.name}</b> - <i>${product.price} руб.</i>
    `).join('')}
\
    <b>Итого:</b> <i>${cost} руб.</i>
  `.replace(/^ */mg, ''), Markup.keyboard([

    /* === Send buttons === */

    'Перейти к оформлению',
    'Назад'
  ]).resize())

  /* === Set state === */

  ctx.session.step = 'products:show'

})().catch((error) => nError(error, ctx))
