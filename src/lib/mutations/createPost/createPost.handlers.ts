import { rest, RestHandler } from 'msw'

import { GetProcess } from '../../queries/getProcess/getProcess'

export function createPostHandler(): RestHandler {
  return rest.put(
    'https://api.fluro.io/post/:personId/:definitionType',
    (req, res, ctx) => {
      const personId = req.params.personId as string
      const definitionType = req.params.definitionType as string
      return res(
        ctx.set('Cache-Control', 'no-cache'),
        ctx.json<GetProcess>({
          personId,
          definitionType,
          ...(req.body as object)
        } as unknown as GetProcess)
      )
    }
  )
}

export function createPostHandlerError(): RestHandler {
  return rest.put(
    'https://api.fluro.io/post/:personId/:definitionType',
    (_req, res, ctx) => {
      return res(ctx.status(500))
    }
  )
}
