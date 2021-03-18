import { Context, Markup } from "telegraf"
import { nError, $db } from "../funcs"

export default async (ctx: any) => (async () => {

  if(ctx.message.text.toLowerCase().includes('назад'))
    return require('./reset').default(ctx)

  /* === Registering === */

  if(ctx.session.step === 'registering:gender')
    return require('./users/ask-gender').default(ctx)

  if(ctx.session.step === 'registering:age')
    return require('./users/ask-age').default(ctx)

  if (ctx.session.step === 'registering:completed')
    return require('./users/show-menu').default(ctx)

  /* === Show about referal system === */

  if (ctx.session.step === 'from-menu' && ctx.message.text.toLowerCase().includes('реферал'))
    return require('./users/show-about-referal').default(ctx)

  /* === Show about shop === */

  if (ctx.session.step === 'from-menu' && ctx.message.text.toLowerCase().includes('о магазине'))
    return require('./users/show-about').default(ctx)

  /* === Show categories === */

  if (ctx.session.step === 'from-menu' && ctx.message.text.toLowerCase().includes('каталог'))
    return require('./products/show-categories').default(ctx)

  /* === Show products === */

  if (ctx.session.step === 'products:categories' && !ctx.message.text.toLowerCase().includes('корзин'))
    return require('./products/show-products').default(ctx)

  /* === Show cart === */

  if (ctx.session.step === 'products:categories' && ctx.message.text.toLowerCase().includes('корзин'))
    return require('./products/show-cart').default(ctx)

  /* === Checkout === */

  if (ctx.session.step === 'products:show' && ctx.message.text.toLowerCase().includes('к оформлени'))
    return require('./products/checkout').default(ctx)

  if (ctx.session.step === 'checkout:name')
    return require('./products/checkout-name').default(ctx)

  if (ctx.session.step === 'checkout:phone')
    return require('./products/checkout-phone').default(ctx)

  /* === Support === */

  if (ctx.session.step === 'from-menu' && ctx.message.text.toLowerCase().includes('обратная связь'))
    return require('./users/open-ticket').default(ctx)

  if (ctx.session.step === 'support:open-ticket')
    return require('./users/send-ticket').default(ctx)

  /* === Admin === */

  if(!(await $db.users.countDocuments({id: ctx.from?.id, isAdmin: true})))
    return ctx.reply('❌ Нет доступа')

  if(ctx.session.step === 'from-menu' && ctx.message.text.toLowerCase().includes('админка'))
    return require('./admin/show-menu').default(ctx)

  if(ctx.session.step === 'admin:from-menu' && ctx.message.text.toLowerCase().includes('краткая информация'))
    return require('./admin/show-summary').default(ctx)

  if(ctx.session.step === 'admin:from-menu' && ctx.message.text.toLowerCase().includes('о пользователе'))
    return require('./admin/user-info-prompt').default(ctx)

  if(ctx.session.step === 'admin:from-menu' && ctx.message.text.toLowerCase().includes('excel'))
    return require('./admin/export-orders').default(ctx)

  if(ctx.session.step === 'admin:user-info')
    return require('./admin/user-info').default(ctx)

  /* === Broadcast === */

  if(ctx.session.step === 'admin:from-menu' && ctx.message.text.toLowerCase().includes('рассылк'))
    return require('./admin/broadcast-gender').default(ctx)

  if(ctx.session.step === 'admin:broadcast:gender')
    return require('./admin/broadcast-age').default(ctx)

  if(ctx.session.step === 'admin:broadcast:age')
    return require('./admin/broadcast-text').default(ctx)

  if (ctx.session.step === 'admin:broadcast:text')
    return require('./admin/broadcast-send').default(ctx)

})().catch((error) => nError(error, ctx))
