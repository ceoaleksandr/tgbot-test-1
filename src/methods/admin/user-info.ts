import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"
import categories from "../../misc/categories"
import { ObjectId } from "mongodb"
import { validate } from "../../misc/validate"
import keyboard from "../../keyboards/admin-default"

export default async (ctx: any) => (async () => {

  const entity = ctx.update.message.text.replace('@', '')

  let isId, isUsername

  if((/^[a-z]\w{5,}$/i).test(entity)) isUsername = true
  else if ((/^\d+$/).test(entity)) isId = true

  if(!isId && !isUsername)
    return ctx.replyWithHTML(`
      Не удалось определить пользователя. Укажите его ник, либо его ID
    `.replace(/^ */mg, ''))

  /* === Fetch user info === */

  const user = await $db.users.findOne(isId ? {id: +entity} : {username: entity})

  if(!user)
    return ctx.replyWithHTML(`
      Пользователь не найден
    `.replace(/^ */mg, ''), Markup.keyboard([
      'Назад'
    ]).resize())

  const ordersAmount = await $db.orders.countDocuments({client: user._id})

  /* === Send message === */

  await ctx.replyWithHTML(`
    <b>Информация о пользователе:</b>
  `.replace(/^ */mg, ''), await keyboard(ctx))

  await ctx.replyWithHTML(`
    <b>Имя:</b> <i>${user.firstName}</i>
    ${user.lastName ? `<b>Фамилия:</b> <i>${user.lastName}</i>` : ''}

    <b>ID:</b> <code>${user.id}</code>
    ${user.username ? `<b>Никнейм:</b> @${user.username}` : ''}

    ${user.gender ? `<b>Пол:</b> <i>${user.gender}</i>` : ''}
    ${user.ageRange ? `<b>Возраст:</b> <i>${user.ageRange}</i>` : ''}

    <b>Накоплено баллов:</b> <i>${user.balance}</i>
    <b>Сделано заказов:</b> <i>${ordersAmount}</i>

    <b>Дата регистрации:</b>
    <i>${(new Date(user.createdAt)).toLocaleString()}</i>
  `.replace(/^ */mg, ''), Markup.inlineKeyboard([
    ...(user.isAdmin ? [
      { text: 'Забрать админку', callback_data: `remove-admin:${user._id}` }
    ] : [
      { text: 'Дать админку', callback_data: `add-admin:${user._id}` }
    ])
  ]))

})().catch((error) => nError(error, ctx))
