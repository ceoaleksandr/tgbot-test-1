import { Context, Markup } from "telegraf"
import { nError, $db } from "../../funcs"
import categories from "../../misc/categories"

export default async (ctx: any) => (async () => {

  const categoryIndex = categories.findIndex(category => category === ctx.update.message.text)

  const products = await $db.products.find({category: categoryIndex}).toArray()

  /* === Send products === */

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    
    await ctx.replyWithPhoto({
      url: product.image,
      filename: 'image.jpg'
    }, {
      caption: `
        <b>${product.name}</b>
        <i>${product.price.toLocaleString()} рублей</i>

        <i>${product.description}</i>
      `.replace(/^ */mg, ''),
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        ...(ctx.session.cart.includes(product._id.toString()) ? [
          { text: 'Убрать из корзины', callback_data: `removeFromCart:${product._id}` }
        ] : [
          { text: 'Добавить в корзину', callback_data: `addToCart:${product._id}` }
        ])
      ])
    })
  }

  await ctx.reply(`
    После выбора товара перейдите в корзину, чтобы оформить заказ.

    Либо, можете выбрать товар из других категорий
  `.replace(/^ */mg, ''), Markup.keyboard((categories).concat('Назад').concat(['🛒 Корзина 🛒']), {
    columns: 2
  }).resize())

})().catch((error) => nError(error, ctx))
