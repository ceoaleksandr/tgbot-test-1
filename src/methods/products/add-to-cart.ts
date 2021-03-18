import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"
import categories from "../../misc/categories"
import {ObjectId} from "mongodb"

export default async (ctx: any) => (async () => {

  const {id,  data, message} = ctx.update.callback_query

  const args = data.split(':')

  const productId = args[1]

  /* === Add to cart === */

  ctx.session.cart.push(productId)

  /* === Send welcome message === */

  await ctx.answerCbQuery('Продукт добавлен в корзину')

  await ctx.telegram.editMessageReplyMarkup(message.chat.id, message.message_id, id, {
    inline_keyboard: [
      [{ text: 'Убрать из корзины', callback_data: `removeFromCart:${productId}` }]
    ]
  })

})().catch((error) => nError(error, ctx))
