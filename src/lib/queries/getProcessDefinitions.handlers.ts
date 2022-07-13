import { rest, RestHandler } from 'msw'

export function getProcessDefinitionsHandler(): RestHandler {
  return rest.post('https://api.fluro.io/defined', (req, res, ctx) => {
    req.body = { types: ['process'] }
    return res(
      ctx.status(200),
      ctx.json({
        definitionName: 'process',
        definitions: [
          {
            title: 'Connect Lead',
            plural: 'Connect Leads',
            definitionName: 'connectLead',
            firstLine:
              'A contact that has expressed an interest and have been assigned'
          },
          {
            title: 'Explorer',
            plural: 'Explorers',
            definitionName: 'exploreStudy',
            firstLine:
              'A contact who is interested in finding out more about Christianity'
          },
          {
            title: 'Lead',
            plural: 'Leads',
            definitionName: 'initialContact',
            firstLine:
              'A contact that has expressed an interest and have been assigned'
          },
          {
            title: 'New Believer',
            plural: 'New Believers',
            definitionName: 'followUp',
            firstLine:
              'A contact who has recently made a decision to follow Christ'
          }
        ],
        fields: [
          {
            type: 'string',
            title: 'Title',
            key: 'title',
            description: 'The title of this content'
          },
          {
            type: 'date',
            title: 'Updated Date',
            key: 'updated',
            description: 'The datestamp of when this content was last modified'
          },
          {
            type: 'reference',
            title: 'Assign To Contact/s',
            key: 'assignedTo',
            description: 'Who is this process card assigned to'
          }
        ],
        plural: 'Process Cards',
        title: 'Process Card'
      })
    )
  })
}
