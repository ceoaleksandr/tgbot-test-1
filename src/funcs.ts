import consola from "consola"
import { MongoClient } from "mongodb"
import {Context} from "telegraf"

// Export debug
export const debug: boolean = process.env.NODE_ENV === "development"

// Random number generator
export const rand = (min: number, max: number): number => {
  return Math.round(Math.random() * (max - min) + min)
}

/* === Prepare MongoDB === */

interface dbObject {
  [key: string]: any
}

export let $db: dbObject = {}

MongoClient.connect(process.env.DB_URI, {
  useUnifiedTopology: true
}).then((client) => {
  let db = client.db(process.env.DB_NAME)

  $db = {
    users: db.collection("users"),
    products: db.collection("products"),
    orders: db.collection('orders'),
    
    $close: client.close,
    $db: db
  }

  consola.ready(`Connected to MongoDB at ${process.env.DB_URI}`)
}).catch((error) => {
  consola.error(error)
  process.exit(1)
})

/* === Error handler === */

export const nError = (error: Error, ctx?: Context): Error => {
  const errorText: string = error.message

  consola.error(error)

  // Send error message to user
  if(ctx) {

    if(ctx.from?.language_code === 'ru')
      ctx?.replyWithHTML(`
        ❌ <b>В работе бота возникла ошибка. Попробуйте позже.</b>

        Текст ошибки:
        <code>${errorText}</code>
      `.replace(/^ */mg, ''))

    else
      ctx?.replyWithHTML(`
        ❌ <b>An Error occured. Try again later.</b>

        Error text:
        <code>${errorText}</code>
      `.replace(/^ */mg, ''))
  }
    
  return error
}
