import { HttpResponse, HttpRequest } from './http'

export interface Controller {
  handle: (HttpRequest: HttpRequest) => Promise<HttpResponse>
}
