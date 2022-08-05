import { rest, RestHandler } from 'msw'

import { GetProcess } from '../../queries/getProcess/getProcess'

export function updateProcessHandler(): RestHandler {
  return rest.put(
    'https://api.fluro.io/content/:definition/:_id',
    (req, res, ctx) => {
      const _id = req.params._id as string
      const definition = req.params.definition as string
      return res(
        ctx.set('Cache-Control', 'no-cache'),
        ctx.json<GetProcess>({
          _id,
          definition,
          ...(req.body as object)
        } as unknown as GetProcess)
      )
    }
  )
}

export function updateProcessHandlerError(): RestHandler {
  return rest.put(
    'https://api.fluro.io/content/:definition/:_id',
    (_req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json(['Failed to update process. Please try again!'])
      )
    }
  )
}
