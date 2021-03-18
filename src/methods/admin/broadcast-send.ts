import { Context, Markup, session } from "telegraf"
import { nError, $db } from "../../funcs"
import categories from "../../misc/categories"
import { ObjectId } from "mongodb"
import { validate } from "../../misc/validate"
import keyboard from "../../keyboards/admin-default"


export default async (ctx: any) => (async () => {

  const text = ctx.update.message.text

  const ids = (await $db.users.find({
    gender: ctx.session.broadcast.gender || {$exists: true},
    ageRange: ctx.session.broadcast.age || { $exists: true },
  }, {
    project: {
      id: true
    }
  }).toArray()).map((user: any) => user.id)

  await ctx.broadcaster.sendText(ids, text)

  /* === Send message === */

  await ctx.replyWithHTML(`
    Готово!
  `.replace(/^ */mg, ''), await keyboard(ctx))

})().catch((error) => nError(error, ctx))
