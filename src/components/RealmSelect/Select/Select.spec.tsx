import { fireEvent, render, screen } from '@testing-library/react'

import { RealmSelectSelect } from '.'

describe('RealmSelectSelect', () => {
  it('calls onClick when clicked', () => {
    const onClick = jest.fn()
    render(<RealmSelectSelect onClick={onClick} value={[]} data={[]} />)
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Realm ​' }))
    expect(onClick).toHaveBeenCalled()
  })

  it('renders realm label for selected', () => {
    render(
      <RealmSelectSelect
        onClick={jest.fn()}
        value={['realmId1', 'realmId5', 'realmId8']}
        data={[
          {
            realms: [
              {
                _id: 'realmId1',
                title: 'Realm 1',
                children: [
                  { _id: 'realmId2', title: 'Realm 2', children: [] },
                  { _id: 'realmId3', title: 'Realm 3', children: [] }
                ]
              },
              {
                _id: 'reamlId4',
                title: 'Realm 4',
                children: [
                  { _id: 'realmId5', title: 'Realm 5', children: [] },
                  { _id: 'realmId6', title: 'Realm 6', children: [] }
                ]
              }
            ]
          },
          {
            realms: [
              {
                _id: 'reamlId7',
                title: 'Realm 7',
                children: [{ _id: 'realmId8', title: 'Realm 8', children: [] }]
              }
            ]
          }
        ]}
      />
    )
    expect(screen.getByText('Realm 1, Realm 5, Realm 8')).toBeInTheDocument()
  })
})
