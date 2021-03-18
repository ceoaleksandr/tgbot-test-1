import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"

export default async (ctx: any) => (async () => {

  /* === Set state === */

  ctx.session.step = 'registering:completed'

  /* === Set user gender === */

  await $db.users.updateOne({id: ctx.from?.id}, {$set: {
    gender: ctx.update.message.text.toLowerCase() === 'мужской' ? 'male' : 'female'
  }})

  /* === Send welcome message === */

  await ctx.reply(`
    Хорошо. Теперь укажи свой возраст
  `.replace(/^ */mg, ''), Markup.keyboard([

    /* === Send buttons === */

    'От 18 до 20 лет', 'От 20 до 30 лет', 'Старше 30 лет'
  ]).resize())
})().catch((error) => nError(error, ctx))
