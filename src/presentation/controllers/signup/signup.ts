import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, EmailValidator, AddAccount } from './signup-protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (HttpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!HttpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = HttpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      this.addAccount.add({
        name,
        email,
        password
      })
      return { statusCode: 200, body: null }
    } catch (error) {
      return serverError()
    }
  }
}