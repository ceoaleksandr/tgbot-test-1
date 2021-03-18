# Telegram Bot

**Runs only on GNU/Linux systems**

## Features

- Built with [Telegraf](https://telegraf.js.org)
- Installed useful plugins (_telegraf-command-parts_, _telegraf-session-mongodb_)
- All code in TypeScript
- Input data validation in _src/misc/validate.js_
- MongoDB Driven
- DB preparings (migration) template in _src/migrations.js_. For run, use `yarn migrate`

## How to set up

- Install Node.JS
- Install MongoDB Server
- Rename _.env-example_ to _.env_ and fill data in it

As everywhere, you have also to download this repo. Then you have to execute:

`yarn` or `npm i`

## Run in development

`yarn dev`

## Run in production

`yarn run`
