// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import { setupIonicReact } from '@ionic/react'
import { mockIonicReact } from '@ionic/react-test-utils'
import { rest } from 'msw'

import { client } from './lib/fluro'
import { mswServer } from './mocks/mswServer'

setupIonicReact({
  mode: 'md'
})
mockIonicReact()

// Mock matchmedia
window.matchMedia =
  window.matchMedia ||
  function (): MediaQueryList {
    return {
      matches: false,
      addListener: (): void => {},
      removeListener: (): void => {}
    } as unknown as MediaQueryList
  }

beforeAll(() => mswServer.listen())
beforeEach(() => {
  mswServer.use(
    rest.options('https://api.fluro.io/*', (_req, res, ctx) =>
      res(
        ctx.set({
          'access-control-allow-credentials': 'true',
          'access-control-allow-headers':
            'authorization,fluro-api-version,fluro-request-date,fluro-request-timezone',
          'access-control-allow-methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
          'access-control-allow-origin': '*',
          'access-control-expose-headers': 'x-fluro-pager-total'
        }),
        ctx.status(204)
      )
    )
  )
})
afterEach(() => {
  client.cache.reset()
  mswServer.resetHandlers()
})
afterAll(() => mswServer.close())
