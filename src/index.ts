import {Telegraf} from 'telegraf'
import consola from 'consola'
import RedisSession from "telegraf-session-redis"
import Broadcaster from "telegraf-broadcast"

import {nError, $db} from "./funcs"

const bot = new Telegraf(process.env.BOT_TOKEN)

const session = new RedisSession({
  store: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
})

const broadcaster = new Broadcaster(bot, {})

// Run
const main = async () => {

  /* === Add sessions support === */

  bot.use(session.middleware())

  /* === Prepare cart === */

  bot.use(async (ctx: any, next) => {

    if(!ctx.session.cart) ctx.session.cart = []

    await next()
  })

  /* === Add broadcaster === */

  bot.use(broadcaster.middleware())

  /* === Set middlewares === */

  bot.start(require('./methods/start').default)
  bot.command('/count', require('./methods/count').default)
  bot.action(/^addToCart/, require('./methods/products/add-to-cart').default)
  bot.action(/^removeFromCart/, require('./methods/products/remove-from-cart').default)

  bot.action(/^add-admin/, require('./methods/admin/add-admin').default)
  bot.action(/^remove-admin/, require('./methods/admin/remove-admin').default)


  bot.on('text', require('./methods/_on-text').default)

  // Launch the bot
  bot.launch().then(() => {
    consola.success('The bot is launched!')
  }).catch(nError)
}

setTimeout(main, 1000)
