import { rest, RestHandler } from 'msw'

import { GetContact } from './getContact'

export function getContactHandler(contact?: Partial<GetContact>): RestHandler {
  return rest.get('https://api.fluro.io/content/get/:_id', (req, res, ctx) => {
    const _id = req.params._id as string
    return res(
      ctx.json<GetContact>({
        _id,
        emails: ['robert.smith@example.com'],
        phoneNumbers: ['021935873'],
        firstName: 'Robert',
        lastName: 'Smith',
        process: {
          initialContact: [
            {
              _id: '622d918855930c0083147ce7',
              item: _id,
              definition: 'initialContact',
              state: 'step_2step_2_a}'
            }
          ]
        },
        ...contact
      })
    )
  })
}

export function getContactHandlerSimple(): RestHandler {
  return getContactHandler({
    emails: [],
    phoneNumbers: [],
    firstName: 'Sarah',
    lastName: 'Parker',
    process: {}
  })
}

export function getContactHandlerLoading(): RestHandler {
  return rest.get('https://api.fluro.io/content/get/:_id', (_req, res, ctx) => {
    return res(ctx.delay(1000 * 60 * 60 * 60))
  })
}
