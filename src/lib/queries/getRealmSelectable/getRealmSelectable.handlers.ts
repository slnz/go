import { rest, RestHandler } from 'msw'

import { GetRealmSelectable } from './getRealmSelectable'

export function getRealmSelectableHandler(): RestHandler {
  return rest.get('https://api.fluro.io/realm/selectable', (_req, res, ctx) => {
    return res(
      ctx.json<GetRealmSelectable>([
        {
          plural: 'Realms',
          definition: 'realm',
          realms: [
            {
              _id: 'realmId1',
              title: 'Tandem Ministries',
              children: [
                {
                  _id: 'realmId2',
                  title: 'Athletes in Action',
                  children: [
                    {
                      _id: 'realmId3',
                      title: 'AIA: AUT: City',
                      children: []
                    }
                  ]
                },
                {
                  _id: 'realmId4',
                  title: 'FamilyLife',
                  children: []
                },
                {
                  _id: 'realmId5',
                  title: 'Member Care',
                  children: []
                },
                {
                  _id: 'realmId6',
                  title: 'Student Life',
                  children: [
                    {
                      _id: 'realmId7',
                      title: 'Other',
                      children: []
                    },
                    {
                      _id: 'realmId8',
                      title: 'SL Auckland',
                      children: [
                        {
                          _id: 'realmId9',
                          title: 'AUT: City',
                          children: []
                        }
                      ]
                    }
                  ]
                },
                {
                  _id: 'realmId10',
                  title: 'Tandem Photos',
                  children: []
                },
                {
                  _id: 'realmId11',
                  title: 'Test Realm',
                  children: []
                },
                {
                  _id: 'realmId12',
                  title: 'Work Life',
                  children: []
                }
              ]
            }
          ]
        },
        {
          plural: 'Staff Teams',
          definition: 'staffTeam',
          realms: [
            {
              _id: 'realmId13',
              title: 'Auckland Staff Team',
              children: []
            },
            {
              _id: 'realmId14',
              title: 'Test Staff Team',
              children: []
            }
          ]
        }
      ])
    )
  })
}

export function getRealmSelectableHandlerLoading(): RestHandler {
  return rest.get('https://api.fluro.io/realm/selectable', (_req, res, ctx) => {
    return res(ctx.delay(1000 * 60 * 60 * 60))
  })
}
