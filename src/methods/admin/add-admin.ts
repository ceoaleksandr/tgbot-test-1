import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"
import categories from "../../misc/categories"
import { ObjectId } from "mongodb"

export default async (ctx: any) => (async () => {

  const { id, data, message } = ctx.update.callback_query

  const args = data.split(':')

  const userId = args[1]

  /* === Make admin === */

  await $db.users.updateOne({_id: new ObjectId(userId)}, {$set: {
    isAdmin: true
  }})

  /* === Send welcome message === */

  await ctx.answerCbQuery('Пользователь теперь админ')

  await ctx.telegram.editMessageReplyMarkup(message.chat.id, message.message_id, id, {
    inline_keyboard: [
      [{ text: 'Забрать админку', callback_data: `remove-admin:${userId}` }]
    ]
  })

})().catch((error) => nError(error, ctx))
