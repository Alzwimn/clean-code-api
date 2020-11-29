import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (HttpRequest: HttpRequest): HttpResponse {
    if (!HttpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!HttpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
