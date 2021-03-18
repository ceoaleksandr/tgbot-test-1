declare global {
  interface vRule {
    rule: string,
    entity: any
  }
}

export const validate = (rule: string, entity: any) => {

  let isValid = null

  if (entity === undefined) return `"${rule}" field is not set`

  /* === Account === */

  if (rule === "username") {

    isValid = true
    if (typeof entity != "string") isValid = false

    else if (!((/^[a-z0-9][a-z0-9_\-.]{3,23}[a-z0-9]$/).test(entity))) {
      isValid = false
    }

  }

  if (rule === "name") {

    isValid = true
    if (typeof entity != "string") isValid = false

    else if (!((/^[A-ZА-ЯЁ][a-zа-яё-]{0,23}[a-zа-яё]$/).test(entity))) {
      isValid = false
    }

  }

  if (rule === "email") {

    isValid = true
    if (typeof entity != "string") isValid = false

    else if (!((/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(entity))) {
      isValid = false
    }

  }

  if (rule === "password") {

    isValid = true
    if (typeof entity != "string") isValid = false

    else if (!((/^.{6,64}$/).test(entity))) {
      isValid = false
    }

  }

  if (rule === "phone") {

    isValid = true
    if (typeof entity != "string") isValid = false

    else if (!((/^\+79\d{9}$/).test(entity.toString()))) {
      isValid = false
    }

  }

  /* === Systen === */

  if (rule === "boolean") {

    isValid = true
    entity = entity.toString()

    if (!["true", "false"].includes(entity)) {
      isValid = false
    }

  }

  if (rule === "comment") {

    isValid = true
    if (typeof entity != "string") isValid = false

    else if (entity.length < 8 || entity.length > 512) {
      isValid = false
    }

  }

  if (rule === "ObjectId") {

    isValid = true
    if (typeof entity != "string") isValid = false

    else if (!(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).test(entity)) {
      isValid = false
    }

  }

  if (rule === "searchQuery") {

    isValid = true
    if (typeof entity != "string") isValid = false

    else if (entity.length < 3 || entity.length > 512) {
      isValid = false
    }

  }

  if (rule === "dbLimit") {

    isValid = true

    if (typeof entity !== "number" || isNaN(entity) || entity < 1 || entity > 20) {
      isValid = false
    }

  }

  if (rule === "dbOffset") {

    isValid = true

    if (typeof entity !== "number" || isNaN(entity) || entity <= 0) {
      isValid = false
    }

  }

  if (["amount"].includes(rule)) {

    isValid = true

    if (typeof entity !== "number" || isNaN(entity) || entity <= 0) {
      isValid = false
    }

  }

  if (isValid === null)
    return `No validation rule set for this entity: "${entity}"`

  if (isValid === false)
    return `"${rule}" field is not valid. Recieved: ${entity}`

}

export const validateMany = (vRules: vRule[]) => vRules.map(({ rule, entity }) => validate(rule, entity)).filter(field => field)
