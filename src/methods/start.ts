import {Context, Markup} from "telegraf"
import {nError, $db} from "../funcs"
import {nanoid} from "nanoid"

import keyboard from "../keyboards/default"

export default async (ctx: any) => (async () => {

  /* === Check if already registered === */

  if(await $db.users.countDocuments({id: ctx.from?.id}))
    return ctx.reply('❌ Вы уже начинали диалог с этим ботом', await keyboard(ctx))

  /* === Insert user info into DB === */

  const {ops: [$user]} = await $db.users.insertOne({
    id: ctx.from?.id,
    firstName: ctx.from?.first_name,
    lastName: ctx.from?.last_name,
    username: ctx.from?.username,
    language: ctx.from?.language_code,
    balance: 0,
    refCode: nanoid(8)
  })

  /* === Check if came from referal === */

  const refCode = ctx.update.message.text.replace('/start ', '')
  const $referal = await $db.users.findOne({refCode})

  if(refCode && $referal) {

    await $db.users.updateOne($user, {$set: {
      cameFrom: $referal._id
    }})

    await $db.users.updateOne($referal, {$addToSet: {
      invitedUsers: $user._id
    }})
  }

  /* === Send welcome message === */

  await ctx.reply(`
    Привет, ${ctx.from?.first_name}!

    Для начала тебе нужно указать немного информации о себе 😉
  `.replace(/^ */mg, ''), Markup.keyboard([

    /* === Send buttons === */

    'Окей. Поехали)'
  ]).resize())

  /* === Send message to admins === */

  const ids = (await $db.users.find({
    isAdmin: true
  }, {
    project: {
      id: true
    }
  }).toArray()).map((user: any) => user.id)

  await ctx.broadcaster.sendText(ids, `
    <b>Новый пользователь</b>

    <b>Имя:</b> <i>${ctx.from?.first_name}</i>
    ${ctx.from?.last_name ? `<b>Фамилия:</b> <i>${ctx.from?.last_name}</i>` : ''}

    <b>ID:</b> <code>${$user.id}</code>
    ${$user.username ? `<b>Никнейм:</b> @${$user.username}` : ''}

    ${$referal ? `<b>Пришёл от:</b> ${$referal.username ? `@${$referal.username}` : `<code>${$referal.id}</code>`}` : ''}

  `.replace(/^ */mg, ''), {parse_mode: 'HTML'})

  /* === Set state === */

  ctx.session.step = 'registering:gender'
  
})().catch((error) => nError(error, ctx))
