import { fireEvent, render, screen } from '@testing-library/react'

import { RealmSelectTreeView } from '.'

describe('TreeView', () => {
  it('calls onNodeSelect', () => {
    const onNodeSelect = jest.fn()
    render(
      <RealmSelectTreeView
        realms={[
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
        ]}
        selected={[]}
        onNodeSelect={onNodeSelect}
      />
    )
    fireEvent.click(screen.getByText('Realm 1'))
    expect(onNodeSelect).toHaveBeenCalled()
  })

  it('expands all realms with children', () => {
    render(
      <RealmSelectTreeView
        realms={[
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
        ]}
        selected={[]}
        onNodeSelect={jest.fn()}
      />
    )
    expect(
      screen.getByRole('treeitem', { name: 'Realm 1 Realm 2 Realm 3' })
    ).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getByRole('treeitem', { name: 'Realm 4 Realm 5 Realm 6' })
    ).toHaveAttribute('aria-expanded', 'true')
  })

  it('selects based on selected', () => {
    render(
      <RealmSelectTreeView
        realms={[
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
        ]}
        selected={['realmId1', 'realmId3']}
        onNodeSelect={jest.fn()}
      />
    )
    expect(
      screen.getByRole('treeitem', { name: 'Realm 1 Realm 2 Realm 3' })
    ).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('treeitem', { name: 'Realm 3' })).toHaveAttribute(
      'aria-selected',
      'true'
    )
    expect(
      screen.getByRole('treeitem', { name: 'Realm 2' })
    ).not.toHaveAttribute('aria-selected', 'true')
  })
})
