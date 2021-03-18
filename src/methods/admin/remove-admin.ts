import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"
import categories from "../../misc/categories"
import { ObjectId } from "mongodb"

export default async (ctx: any) => (async () => {

  const { id, data, message } = ctx.update.callback_query

  const args = data.split(':')

  const userId = args[1]

  /* === Make admin === */

  await $db.users.updateOne({ _id: new ObjectId(userId) }, {
    $set: {
      isAdmin: false
    }
  })

  /* === Send welcome message === */

  await ctx.answerCbQuery('Ну и правильно')

  await ctx.telegram.editMessageReplyMarkup(message.chat.id, message.message_id, id, {
    inline_keyboard: [
      [{ text: 'Сделать админом', callback_data: `add-admin:${userId}` }]
    ]
  })

})().catch((error) => nError(error, ctx))
