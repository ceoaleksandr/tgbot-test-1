import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"
import categories from "../../misc/categories"
import { ObjectId } from "mongodb"

export default async (ctx: any) => (async () => {

  const { id, data, message } = ctx.update.callback_query

  const args = data.split(':')

  const productId = new ObjectId(args[1])

  /* === Remove from cart === */

  let i = ctx.session.cart.indexOf(productId)

  ctx.session.cart.splice(i, 1)

  /* === Send welcome message === */

  await ctx.answerCbQuery('Продукт убран из корзины')

  await ctx.telegram.editMessageReplyMarkup(message.chat.id, message.message_id, id, {
    inline_keyboard: [
      [{ text: 'Добавить в корзину', callback_data: `addToCart:${productId}` }]
    ]
  })

})().catch((error) => nError(error, ctx))
