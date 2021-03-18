import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"

import keyboard from "../../keyboards/default"

export default async (ctx: any) => (async () => {

  /* === Set state === */

  ctx.session.step = "from-menu"

  /* === Set user age === */

  const message = ctx.update.message.text.toLowerCase()
  let ageRange

  if(message.includes('18 до 20'))
    ageRange = '18-20'
  else if(message.includes('20 до 30'))
    ageRange = '20-30'
  else
    ageRange = '30+'

  await $db.users.updateOne({ id: ctx.from?.id }, {$set: {ageRange}})

  /* === Send welcome message === */

  await ctx.reply(`
    Отлично! Вы зарегистрированы! 😊

    Добро пожаловать!
  `.replace(/^ */mg, ''), await keyboard(ctx))
})().catch((error) => nError(error, ctx))
