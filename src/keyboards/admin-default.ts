import { Markup, Context, session } from "telegraf"
import { $db } from "../funcs"

export default async (ctx: SessionContext) => {

  ctx.session.step = 'admin:from-menu'

  return Markup.keyboard([
    'Краткая информация',
    'Информация о пользователе',
    'Рассылка',
    'Выгрузить покупки (excel)',
    'Назад'
  ]).resize()
}
