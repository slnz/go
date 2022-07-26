import { rest, RestHandler } from 'msw'

import { Contact, Process } from './getContacts'

function getProcessesHandler(): RestHandler {
  return rest.post('https://api.fluro.io/content/_query', (req, res, ctx) => {
    req.body = {
      types: 'process',
      assignedTo: { $in: ['userContactId'] }
    }
    return res(
      ctx.status(200),
      ctx.json<Process[]>([
        {
          _id: '622d918855930c0083147ce1',
          item: 'aa',
          definition: 'exploreStudy',
          assignedTo: ['userContactId'],
          taskCount: { incomplete: 1, pending: 0 }
        },
        {
          _id: '622d918855930c0083147ce1',
          item: 'bb',
          definition: 'exploreStudy',
          assignedTo: ['userContactId'],
          taskCount: { incomplete: 1, pending: 0 }
        },
        {
          _id: '622d918855930c0083147ce1',
          item: 'cc',
          definition: 'exploreStudy',
          assignedTo: ['userContactId'],
          taskCount: { incomplete: 1, pending: 0 }
        },
        {
          _id: '622d918855930c0083147ce1',
          item: 'dd',
          definition: 'exploreStudy',
          assignedTo: ['userContactId'],
          taskCount: { incomplete: 1, pending: 0 }
        },
        {
          _id: '622d918855930c0083147ce2',
          item: 'bb',
          definition: 'followUp',
          assignedTo: ['userContactId'],
          taskCount: { incomplete: 1, pending: 0 }
        },
        {
          _id: '622d918855930c0083147ce3',
          item: 'bb',
          definition: 'connectLead',
          assignedTo: ['userContactId'],
          taskCount: { incomplete: 1, pending: 0 }
        },
        {
          _id: '622d918855930c0083147ce3',
          item: 'dd',
          definition: 'connectLead',
          assignedTo: ['userContactId'],
          taskCount: { incomplete: 1, pending: 0 }
        },
        {
          _id: '622d918855930c0083147ce7',
          item: 'ck',
          definition: 'initialContact',
          assignedTo: ['userContactId'],
          taskCount: { incomplete: 1, pending: 0 }
        }
      ])
    )
  })
}

function getProcessesHandlerSimple(): RestHandler {
  return rest.post('https://api.fluro.io/content/_query', (req, res, ctx) => {
    req.body = {
      types: 'process',
      assignedTo: { $in: ['userContactId'] }
    }
    return res(
      ctx.status(200),
      ctx.json<Process[]>([
        {
          _id: '622d918855930c0083147ce1',
          item: 'aa',
          definition: 'exploreStudy',
          assignedTo: ['userContactId'],
          taskCount: { incomplete: 1, pending: 0 }
        },
        {
          _id: '622d918855930c0083147ce1',
          item: 'bb',
          definition: 'exploreStudy',
          assignedTo: ['userContactId'],
          taskCount: { incomplete: 1, pending: 0 }
        },
        {
          _id: '622d918855930c0083147ce1',
          item: 'cc',
          definition: 'exploreStudy',
          assignedTo: ['userContactId'],
          taskCount: { incomplete: 1, pending: 0 }
        },
        {
          _id: '622d918855930c0083147ce1',
          item: 'dd',
          definition: 'exploreStudy',
          assignedTo: ['userContactId'],
          taskCount: { incomplete: 1, pending: 0 }
        }
      ])
    )
  })
}

function getProcessesHandlerLoading(): RestHandler {
  return rest.post('https://api.fluro.io/content/_query', (_req, res, ctx) => {
    return res(ctx.delay('infinite'))
  })
}

export function getContactsHandler(): RestHandler[] {
  return [
    getProcessesHandler(),
    rest.post(
      'https://api.fluro.io/content/contact/multiple',
      (req, res, ctx) => {
        req.body = {
          ids: ['aa', 'bb', 'cc', 'ck', 'dd'],
          select: ['firstName', 'lastName']
        }
        return res(
          ctx.status(200),
          ctx.json<Contact[]>([
            {
              _id: 'aa',
              firstName: 'Albert',
              lastName: 'Allen'
            },
            {
              _id: 'bb',
              firstName: 'Bonnie',
              lastName: 'Blythe'
            },
            {
              _id: 'ck',
              firstName: 'Caitlin',
              lastName: 'Kim'
            },
            {
              _id: 'cc',
              firstName: 'Caitlin',
              lastName: 'Collins'
            },
            {
              _id: 'dd',
              firstName: 'Dexter',
              lastName: 'Dunn'
            }
          ])
        )
      }
    )
  ]
}

export function getContactsHandlerSimple(): RestHandler[] {
  return [
    getProcessesHandlerSimple(),
    rest.post(
      'https://api.fluro.io/content/contact/multiple',
      (req, res, ctx) => {
        req.body = {
          ids: ['aa', 'bb', 'cc', 'ck', 'dd'],
          select: ['firstName', 'lastName']
        }
        return res(
          ctx.status(200),
          ctx.json<Contact[]>([
            {
              _id: 'aa',
              firstName: 'Albert',
              lastName: 'Allen'
            },
            {
              _id: 'bb',
              firstName: 'Bonnie',
              lastName: 'Blythe'
            },
            {
              _id: 'cc',
              firstName: 'Caitlin',
              lastName: 'Collins'
            },
            {
              _id: 'dd',
              firstName: 'Dexter',
              lastName: 'Dunn'
            }
          ])
        )
      }
    )
  ]
}

export function getContactsHandlerLoading(): RestHandler[] {
  return [
    getProcessesHandlerLoading(),
    rest.post(
      'https://api.fluro.io/content/contact/multiple',
      (_req, res, ctx) => {
        return res(ctx.delay('infinite'))
      }
    )
  ]
}
