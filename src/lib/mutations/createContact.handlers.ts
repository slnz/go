import { rest, RestHandler } from 'msw'

export function createContactHandler(): RestHandler {
  return rest.post('https://api.fluro.io/content/contact', (req, res, ctx) => {
    return res(
      ctx.json({
        firstName: 'Robert',
        lastName: 'Smith',
        gender: 'Unknown',
        phoneNumbers: '0000000000',
        email: 'test@test.com',
        realms: ['5ef28e46ee3a9925cef7a5fd']
      })
    )
  })
}
