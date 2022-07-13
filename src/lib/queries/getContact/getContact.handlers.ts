import { rest, RestHandler } from 'msw'

import { GetContact } from './getContact'

export function getContactHandler(contact?: Partial<GetContact>): RestHandler {
  return rest.get('https://api.fluro.io/content/get/:_id', (req, res, ctx) => {
    const _id = req.params._id
    return res(
      ctx.json({
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
