import { rest, RestHandler } from 'msw'

import { GetProcess } from './getProcess'

export function getProcessHandler(contact?: Partial<GetProcess>): RestHandler {
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
          initialProcess: [
            {
              _id: '622d918855930c0083147ce7',
              item: _id,
              definition: 'initialProcess',
              state: 'step_2step_2_a}'
            }
          ]
        },
        ...contact
      })
    )
  })
}

export function getProcessHandlerLoading(): RestHandler {
  return rest.get('https://api.fluro.io/content/get/:_id', (_req, res, ctx) => {
    return res(ctx.delay(1000 * 60 * 60 * 60))
  })
}
