import { $db } from "./funcs"
import consola from "consola"

const main = (async () => {

  /* === Add products === */

  await $db.products.insertMany([{
    name: 'Имфузория',
    price: 150,
    category: 0,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  }, {
    name: 'Авокадо',
    price: 750,
    category: 0,
    description: 'Morbi iaculis leo nunc, vitae consequat magna.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  }, {
    name: 'Памидор',
    price: 350,
    category: 0,
    description: 'Maecenas pretium sem a nibh bibendum, luctus.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'Vesta',
    price: 350,
    category: 0,
    description: 'Vivamus luctus vestibulum augue sit amet accumsan.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'Синий огонь',
    price: 1150,
    category: 0,
    description: 'Vestibulum nec justo quis eros suscipit molestie.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'Жёлтое небо',
    price: 250,
    category: 1,
    description: 'Morbi fringilla ac orci nec rutrum. Proin.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'Белая вода',
    price: 450,
    category: 1,
    description: 'Nam id neque tellus. Maecenas viverra velit.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'Жидкий камень',
    price: 550,
    category: 1,
    description: 'Donec a nunc ex. Nullam ut mauris.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'Высокое озеро',
    price: 950,
    category: 1,
    description: 'Curabitur sagittis eros at sem feugiat, sit.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'Лесной город',
    price: 1000,
    category: 1,
    description: 'Mauris et arcu quis libero interdum pulvinar.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'Песчаная вода',
    price: 2100,
    category: 2,
    description: 'Donec vel turpis ac diam porttitor pretium.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'Холодный ветер',
    price: 750,
    category: 2,
    description: 'Etiam nunc eros, bibendum eget libero sit.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'Зернистый путь',
    price: 850,
    category: 2,
    description: 'Proin a erat in velit dictum luctus.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'Мягкий склон',
    price: 150,
    category: 2,
    description: 'In pellentesque suscipit quam venenatis imperdiet. Nam.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'Бешенный пёс',
    price: 250,
    category: 2,
    description: 'Pellentesque tellus massa, elementum vel rutrum in.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'Кисечка',
    price: 921,
    category: 3,
    description: 'Pellentesque fermentum mattis mi egestas viverra. Donec.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'Eminem',
    price: 1000,
    category: 3,
    description: 'Vestibulum risus lorem, volutpat posuere urna eget.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'TT21',
    price: 300,
    category: 3,
    description: 'Curabitur pretium sem accumsan elementum sagittis. In.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'Pesik',
    price: 300,
    category: 3,
    description: 'Suspendisse lobortis felis nulla, eget hendrerit nisi.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'Bobcat20',
    price: 500,
    category: 3,
    description: 'Etiam eleifend congue orci, ac malesuada elit.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'ИИИИХАААА!!!',
    price: 150000000,
    category: 4,
    description: 'Proin dapibus nisl in sagittis tempor. Praesent.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'Cheap',
    price: 1,
    category: 4,
    description: 'Morbi ut nisl et neque hendrerit elementum.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'Хэтчбак',
    price: 100,
    category: 4,
    description: 'Morbi at pretium metus, sed cursus orci.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'Rihanna',
    price: 109,
    category: 4,
    description: 'Quisque bibendum faucibus rhoncus. Cras odio justo.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  },{
    name: 'Noname',
    price: 90,
    category: 4,
    description: 'Fusce cursus eget nisl sed bibendum. Duis.',
    image: 'https://thumb.tildacdn.com/tild6630-6134-4163-b437-646136613161/-/format/webp/andrew-donovan-valdi.png'
  }])
})

/* === Run this === */

const int = setInterval(() => {

  if (!$db) return

  main().catch(consola.error).finally(() => {
    process.exit(0)
  })

  clearInterval(int)

}, 500)
