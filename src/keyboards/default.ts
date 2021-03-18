import { Markup, Context, session } from "telegraf"
import {$db} from "../funcs"

export default async(ctx: SessionContext) => {

  const isAdmin = await $db.users.countDocuments({id: ctx.from?.id, isAdmin: true})

  ctx.session.step = 'from-menu'

  return Markup.keyboard([
    '✨ Каталог товаров ✨',
    '❔ О магазине ❔',
    '📞 Обратная связь 📞',
    '💸 Реферальная система 💸',

    ...(isAdmin ? ['🔧 Админка 🔧'] : [''])
  ]).resize()
}
