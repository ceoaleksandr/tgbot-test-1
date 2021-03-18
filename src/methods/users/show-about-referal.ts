import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"

export default async (ctx: SessionContext) => (async () => {

  /* === Get user info === */

  const $user = await $db.users.findOne({id: ctx.from?.id})

  /* === Send welcome message === */

  await ctx.reply(`
    💸 <b>Реферальная система</b> 💸

    Вы будете получать <b>10% с каждой попупки</b> пользователя, если он зарегистрируется в боте по этой ссылке:

    t.me/testings_1337_01_bot?start=${$user.refCode}
  `.replace(/^ */mg, ''), {
    parse_mode: 'HTML'
  })
})().catch((error) => nError(error, ctx))
