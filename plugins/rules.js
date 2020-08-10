const REGEXP_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const isEmpty = (x) => x === null || x === undefined || x === ''
const isValidEmail = (x) => REGEXP_EMAIL.test(String(x).toLowerCase())

export default function (_, inject) {
  inject('rules', {
    notEmpty: (x) => !isEmpty(x) || 'El campo no puede estar vacío',
    email: (x) => isValidEmail(x) || 'El campo no es un email válido',
  })
}
