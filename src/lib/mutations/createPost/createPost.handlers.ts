import { rest, RestHandler } from 'msw'

import { GetPost } from '../../queries/getPost'

export function createPostHandler(): RestHandler {
  return rest.post(
    'https://api.fluro.io/post/:personId/:definitionType',
    (req, res, ctx) => {
      const personId = req.params.personId as string
      const definitionType = req.params.definitionType as string

      return res(
        ctx.set('Cache-Control', 'no-cache'),
        ctx.json<GetPost>({
          personId,
          definitionType,
          ...(req.body as object)
        } as unknown as GetPost)
      )
    }
  )
}

export function createPostHandlerError(): RestHandler {
  return rest.post(
    'https://api.fluro.io/post/:personId/:definitionType',
    (_req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json(['Failed to create post. Please try again!'])
      )
    }
  )
}
