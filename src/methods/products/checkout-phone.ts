import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"
import categories from "../../misc/categories"
import { ObjectId } from "mongodb"
import { validate } from "../../misc/validate"
import keyboard from "../../keyboards/default"

export default async (ctx: any) => (async () => {

  const phone = ctx.update.message.text

  /* === Fetch products === */

  const products = await $db.products.find({ _id: { $in: ctx.session.cart.map((product: string) => new ObjectId(product)) } }).toArray()

  /* === Calculate price === */

  let cost: number = 0

  products.forEach((product: any) => cost += product.price)

  /* === Validate === */

  if (validate('phone', phone))
    await ctx.replyWithHTML(`
      Укажите ваш номер телефона, начиная с +7...

      Номер должен быть без пробелов, скобок и других символов
  `.replace(/^ */mg, ''))

  /* === Save order to db === */

  await $db.orders.insertOne({
    products: products.map((product: any) => product._id),
    client: (await $db.users.findOne({id: ctx.from?.id}))._id,
    createdAt: new Date(),
    phone,
    cost
  })

  /* === Cleanup the cart === */

  ctx.session.cart = []

  /* === Send message === */

  await ctx.replyWithHTML(`
    Спасибо!

    Заказ поступил к нам и мы его обрабатываем. Мы свяжемся с Вами по итогу
  `.replace(/^ */mg, ''), await keyboard(ctx))

})().catch((error) => nError(error, ctx))
