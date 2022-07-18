import { rest, RestHandler } from 'msw'

import { GetProcess } from './getProcess'

export function getProcessHandler(process?: Partial<GetProcess>): RestHandler {
  return rest.get('https://api.fluro.io/content/get/:_id', (req, res, ctx) => {
    const _id = req.params._id as string
    return res(
      ctx.json<GetProcess>({
        _id,
        definition: 'initialContact',
        item: {
          _id: '62ba251e87ca9900256b77ab',
          firstName: 'Robert',
          lastName: 'Smith',
          _type: 'contact'
        },
        assignedTo: [
          {
            _id: '5f10e8577b75cc0fdeb66ea0',
            firstName: 'Sarah',
            lastName: 'Apple'
          },
          {
            _id: '62c214fd48863a0026468a93',
            firstName: 'Brian',
            lastName: 'Smith'
          }
        ],
        fullDefinition: {
          _id: '3',
          title: 'Lead',
          plural: 'Leads',
          definitionName: 'initialContact',
          firstLine:
            'A contact that has expressed an interest and have been assigned',
          data: {
            states: [
              { title: 'Call', key: 'step_1' },
              { title: 'Appointment Set', key: 'step_2' },
              { title: 'Not Interested', key: 'step_2step_2_a}' },
              { title: 'Completed', key: 'step_3' }
            ]
          }
        },
        taskLists: [
          {
            tasks: [
              {
                status: 'failed',
                _id: '62bdd5054727d800240c7d86',
                name: 'Call Contact',
                required: true,
                instructions: {
                  completeLabel: 'Appointment Set',
                  pendingLabel: 'Call Back',
                  failedLabel: 'Not interested'
                },
                postComplete: 'appointment',
                postFailed: 'approach',
                description: '<p>Call contact to set up an appointment</p>',
                postPending: 'comment',
                created: '2022-06-30T16:53:25.224Z'
              }
            ],
            state: 'step_1',
            title: 'Call tasks'
          },
          {
            tasks: [
              {
                status: 'pending',
                _id: '62cf5f8c4c16a0002576666c',
                name: 'Meet with Contact',
                required: true,
                instructions: {
                  completeLabel: 'Appointment Completed',
                  pendingLabel: 'Rescheduled',
                  failedLabel: 'No Longer Interested'
                },
                postComplete: 'result',
                postPending: 'appointment',
                postFailed: 'approach',
                created: '2022-07-14T00:13:00.570Z'
              }
            ],
            state: 'step_2',
            title: 'Appointment Set tasks'
          },
          {
            tasks: [
              {
                status: 'incomplete',
                _id: '62d0e5c6305cce0025b9eaf2',
                name: 'Send a message to encourage',
                required: true,
                created: '2022-07-15T03:57:58.800Z'
              },
              {
                status: 'complete',
                _id: '62d13cda82670a002526e03e',
                name: 'Pray',
                required: true,
                created: '2022-07-15T10:09:30.792Z'
              }
            ],
            state: 'step_2',
            title: "Brian's tasks"
          }
        ],
        ...process
      })
    )
  })
}

export function getProcessHandlerLoading(): RestHandler {
  return rest.get('https://api.fluro.io/content/get/:_id', (_req, res, ctx) => {
    return res(ctx.delay(1000 * 60 * 60 * 60))
  })
}
