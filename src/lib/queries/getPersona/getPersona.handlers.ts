import { rest, RestHandler } from 'msw'

import { GetPersona } from './getPersona'

export function getPersonaHandler(persona?: Partial<GetPersona>): RestHandler {
  return rest.get('https://api.fluro.io/content/get/', (req, res, ctx) => {
    console.log('CONTENT GET')
    return res(
      ctx.json<GetPersona>({
        _id: 'personaId',
        firstName: 'Robert',
        lastName: 'Smith',
        title: 'Robert Smith',
        realms: [
          {
            _id: '5ef28e46ee3a9925cef7a5fd',
            title: 'Tandem Ministries'
          }
        ],
        ...persona
      })
    )
  })
}
