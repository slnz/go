import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { GetContacts, Process } from '../../lib/queries/getContacts/getContacts'
import {
  GetDefinitions,
  ProcessDefinition
} from '../../lib/queries/getDefinitions'

import { PersonListItem } from './PersonListItem'

describe('PersonListItem', () => {
  const getContact = (processes: { [key: string]: Process }): GetContacts => {
    return {
      _id: 'aa',
      firstName: 'Albert',
      lastName: 'Allen',
      process: processes
    }
  }

  const definitions: GetDefinitions<ProcessDefinition> = {
    exploreStudy: {
      _id: '0',
      title: 'Explorer',
      plural: 'Explorers',
      definitionName: 'exploreStudy',
      firstLine:
        'A contact who is interested in finding out more about Christianity',
      data: {
        states: []
      }
    },
    initialContact: {
      _id: '1',
      title: 'Lead',
      plural: 'Leads',
      definitionName: 'initialContact',
      firstLine:
        'A contact that has expressed an interest and have been assigned',
      data: {
        states: []
      }
    },
    followUp: {
      _id: '2',
      title: 'New Believer',
      plural: 'New Believers',
      definitionName: 'followUp',
      firstLine: 'A contact who has recently made a decision to follow Christ',
      data: {
        states: []
      }
    }
  }

  it('shows contact name, process type and task count', async () => {
    const processes = {
      exploreStudy: {
        _id: '622d918855930c0083147ce1',
        item: 'aa',
        definition: 'exploreStudy',
        assignedTo: ['userContactId'],
        taskCount: { incomplete: 1, pending: 0 }
      }
    }
    render(
      <BrowserRouter>
        <PersonListItem
          contact={getContact(processes)}
          definitions={definitions}
        />
      </BrowserRouter>
    )
    expect(
      screen.getByRole('heading', { name: 'Albert Allen' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Explorer Albert Allen 1 faith step' })
    ).toBeInTheDocument()
  })

  it('shows 2 process types', async () => {
    const processes = {
      exploreStudy: {
        _id: '622d918855930c0083147ce1',
        item: 'aa',
        definition: 'exploreStudy',
        assignedTo: ['userContactId'],
        taskCount: { incomplete: 1, pending: 0 }
      },
      initialContact: {
        _id: '622d918855930c0083147ce7',
        item: 'ck',
        definition: 'initialContact',
        assignedTo: ['userContactId'],
        taskCount: { incomplete: 0, pending: 1 }
      }
    }
    render(
      <BrowserRouter>
        <PersonListItem
          contact={getContact(processes)}
          definitions={definitions}
        />
      </BrowserRouter>
    )
    expect(
      screen.getByRole('link', {
        name: 'Explorer & Lead Albert Allen 2 faith steps'
      })
    ).toBeInTheDocument()
  })

  it('shows 3 or more process types', async () => {
    const processes = {
      exploreStudy: {
        _id: '622d918855930c0083147ce1',
        item: 'aa',
        definition: 'exploreStudy',
        assignedTo: ['userContactId'],
        taskCount: { incomplete: 1, pending: 0 }
      },
      initialContact: {
        _id: '622d918855930c0083147ce7',
        item: 'aa',
        definition: 'initialContact',
        assignedTo: ['userContactId'],
        taskCount: { incomplete: 0, pending: 1 }
      },
      followUp: {
        _id: '622d918855930c0083147ce2',
        item: 'aa',
        definition: 'followUp',
        assignedTo: ['userContactId'],
        taskCount: { incomplete: 0, pending: 0 }
      }
    }
    render(
      <BrowserRouter>
        <PersonListItem
          contact={getContact(processes)}
          definitions={definitions}
        />
      </BrowserRouter>
    )
    expect(
      screen.getByRole('link', {
        name: 'Explorer, Lead & 1 more Albert Allen 2 faith steps'
      })
    ).toBeInTheDocument()
  })
})
