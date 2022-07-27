import { rest, RestHandler } from 'msw'

import { CreateContactData } from './createContact'

export function createContactHandler(): RestHandler {
  return rest.post('https://api.fluro.io/content/contact', (req, res, ctx) => {
    return res(
      ctx.json<CreateContactData>({
        _id: 'newContactId'
      })
    )
  })
}
