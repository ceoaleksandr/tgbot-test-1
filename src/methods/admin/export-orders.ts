import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"
import categories from "../../misc/categories"
import { ObjectId } from "mongodb"
import { validate } from "../../misc/validate"
import keyboard from "../../keyboards/default"
import xlsx from "node-xlsx"

export default async (ctx: any) => (async () => {

  const orders = await $db.orders.aggregate([
    {$match: {}},

    /* === Fetch products === */

    {$lookup: {
      from: 'products',
      let: {products: '$products'},
      pipeline: [
        {$match: {$expr: {
          $in: ['$_id', '$$products']
        }}}
      ],
      as: 'products'
    }},

    /* === Fetch client === */

    {$lookup: {
      from: 'users',
      let: {client: '$client'},
      pipeline: [
        {$match: {$expr: {
          $eq: ['$_id', '$$client']
        }}}
      ],
      as: 'client'
    }},
    {$unwind: '$client'}
  ]).toArray()

  const excel = xlsx.build([{name: 'main', data: [
    ['Номер заказа', 'Заказчик', 'Товары', 'Дата', 'Итоговая цена'],

    ...orders.map((order: any, i: number) => [
      `${i+1}`,
      `${order.client.firstName} ${order.client.lastName || ''} (${order.phone})`,
      order.products.map((product: any) => product.name).join('\n'),
      `${(new Date(order.createdAt)).toLocaleString()}`,
      `${order.cost.toLocaleString()}`
    ])
  ]}])

  /* === Send message === */

  await ctx.replyWithDocument({
    source: excel,
    filename: 'orders.xlsx'
  })

})().catch((error) => nError(error, ctx))
