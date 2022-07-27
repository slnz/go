import { rest, RestHandler } from 'msw'

import { GetProcess } from '../../queries/getProcess/getProcess'

import { CreateContentData } from './createContent'

export function createContentHandler(): RestHandler {
  return rest.post(
    'https://api.fluro.io/content/:definition',
    (req, res, ctx) => {
      const definition = req.params.definition as string
      return res(
        ctx.set('Cache-Control', 'no-cache'),
        ctx.json<CreateContentData>({
          _id: `${definition}Id`,
          definition,
          ...(req.body as object)
        } as unknown as GetProcess)
      )
    }
  )
}

export function createContentHandlerError(): RestHandler {
  return rest.post(
    'https://api.fluro.io/content/:definition',
    (_req, res, ctx) => {
      return res(ctx.status(500))
    }
  )
}
