import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"
import categories from "../../misc/categories"
import { ObjectId } from "mongodb"
import { validate } from "../../misc/validate"
import keyboard from "../../keyboards/admin-default"

export default async (ctx: SessionContext) => (async () => {

  const usersAmount = await $db.users.countDocuments({})
  const ordersAmount = await $db.orders.countDocuments({})
  const admins = await $db.users.find({isAdmin: true}).toArray()

  /* === Send message === */

  await ctx.replyWithHTML(`
    <b>Краткая информация:</b>

    <b>Зарегистрированных пользователей:</b> <i>${usersAmount}</i>
    
    <b>Сделано заказов:</b> <i>${ordersAmount}</i>

    <b>Админы:</b>

    ${admins.map((admin: any) => `\
      <b>${admin.firstName} ${admin.lastName || ''}</b>
      (${admin.username ? `@${admin.username} / ` : ''}<code>${admin.id}</code>)\n
    `).join('')}
  `.replace(/^ */mg, ''))

})().catch((error) => nError(error, ctx))
