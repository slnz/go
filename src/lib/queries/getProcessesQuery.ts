import { client } from '../fluro'

export async function getProcessesQuery(): Promise<any> {
  const response = await client.api.post(`/content/definition/filter`, {
    filter: {
      operator: 'and',
      filters: [
        {
          operator: 'and',
          filters: [
            {
              comparator: '==',
              key: 'parentType',
              value: 'process'
            }
          ]
        }
      ]
    },
    select: ['definitionName']
  })
}
