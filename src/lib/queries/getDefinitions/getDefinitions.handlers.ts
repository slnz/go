import { rest, RestHandler } from 'msw'

import {
  DefinitionCollection,
  ProcessDefinition,
  PostDefinition
} from './getDefinitions'

export function getProcessDefinitionsHandler(): RestHandler {
  return rest.post('https://api.fluro.io/defined', (req, res, ctx) => {
    req.body = { types: ['process'] }
    return res(
      ctx.status(200),
      ctx.json<DefinitionCollection<ProcessDefinition>[]>([
        {
          definitionName: 'process',
          definitions: [
            {
              _id: '1',
              title: 'Connect Lead',
              plural: 'Connect Leads',
              definitionName: 'connectLead',
              firstLine:
                'A contact that has expressed an interest and have been assigned',
              data: {
                states: [
                  { title: 'Call', key: 'to_call' },
                  { title: 'Appointment Set', key: 'appointment_set' },
                  { title: 'Not Interested', key: 'not_interested' },
                  { title: 'Completed', key: 'completed' }
                ],
                processTypes: ['contact']
              }
            },
            {
              _id: '2',
              title: 'Explorer',
              plural: 'Explorers',
              definitionName: 'exploreStudy',
              firstLine:
                'A contact who is interested in finding out more about Christianity',
              data: {
                states: [
                  { title: 'Invite to Explore', key: 'step_1' },
                  { title: 'Explore Study 1', key: 'step_2' },
                  { title: 'Explore Study 2', key: 'step_3' },
                  { title: 'Explore Study 3', key: 'step_4' },
                  { title: 'Explore Study 4', key: 'step_5' },
                  { title: 'Read A Gospel Together', key: 'step_6' },
                  { title: 'Not Interested', key: 'step_7' },
                  { title: 'Complete', key: 'complete' }
                ]
              }
            },
            {
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
                ],
                processTypes: ['contact']
              }
            },
            {
              _id: '4',
              title: 'New Believer',
              plural: 'New Believers',
              definitionName: 'followUp',
              firstLine:
                'A contact who has recently made a decision to follow Christ',
              data: {
                states: [
                  { title: 'Organize Follow Up', key: 'step_1' },
                  { title: 'Follow Up 1', key: 'step_2' },
                  { title: 'Follow Up 2', key: 'step_2step_2_a}' },
                  { title: 'Follow Up 3', key: 'step_3' },
                  { title: 'Follow Up 4', key: 'step_4' },
                  { title: 'Follow Up 5', key: 'step_5' },
                  { title: 'Completed Follow Up', key: 'step_6' },
                  { title: 'Dropped Out', key: 'step_7' }
                ],
                processTypes: ['contact']
              }
            }
          ],
          plural: 'Process Cards',
          title: 'Process Card'
        }
      ])
    )
  })
}

export function getPostDefinitionsHandler(): RestHandler {
  return rest.post('https://api.fluro.io/defined', (req, res, ctx) => {
    req.body = { types: ['post'] }
    return res(
      ctx.status(200),
      ctx.json<DefinitionCollection<PostDefinition>[]>([
        {
          definitionName: 'post',
          definitions: [
            {
              _id: '1',
              title: 'Appointment',
              plural: 'Appointments',
              definitionName: 'appointment',
              firstLine: 'An appointment from outreach',
              fields: [
                {
                  title: 'Location',
                  key: 'location',
                  type: 'string',
                  directive: 'input',
                  // description is helperText
                  description: 'Where will you be meeting?',
                  placeholder: 'e.g Outside the library',
                  maximum: 1,
                  minimum: 1
                },
                {
                  title: 'Are you excited?',
                  key: 'excited',
                  type: 'boolean',
                  directive: 'input',
                  maximum: 1,
                  minimum: 0
                },
                {
                  title: 'On a scale of 10, how excited are you?',
                  key: 'scale',
                  type: 'number',
                  directive: 'input',
                  maximum: 1,
                  minimum: 0
                },
                {
                  title: 'Date',
                  key: 'date',
                  type: 'date',
                  directive: 'datetime-select',
                  maximum: 1,
                  minimum: 0
                },
                {
                  title: 'Email',
                  key: 'emailMe',
                  type: 'email',
                  directive: 'input',
                  maximum: 1,
                  minimum: 0
                },
                {
                  title: 'Link',
                  key: 'link',
                  type: 'url',
                  directive: 'input',
                  maximum: 1,
                  minimum: 0
                }
              ]
            },
            {
              _id: '2',
              title: 'Approach',
              plural: 'Approaches',
              definitionName: 'approach',
              fields: [
                {
                  title: 'What happened?',
                  key: 'whathappened',
                  type: 'string',
                  directive: 'button-select',
                  placeholder: 'e.g Outside the library',
                  maximum: 1,
                  minimum: 1,
                  options: [
                    { name: 'No show', value: 'noShow' },
                    { name: 'Cancelled', value: 'cancelled' },
                    { name: 'Never replied', value: 'neverReplied' },
                    { name: 'Not Interested', value: 'notInterested' }
                  ]
                }
              ]
            }
            // followUpAppointment
            // followUpResult
            // comment
            // connection
            // agChallengeResult
            // dropOff
            // result
            // exploreAppointment
            // exploreResult
          ],
          plural: 'Posts',
          title: 'Post'
        }
      ])
    )
  })
}

export function getDefinitionsHandlerLoading(): RestHandler {
  return rest.post('https://api.fluro.io/defined', (_req, res, ctx) => {
    return res(ctx.delay('infinite'))
  })
}
