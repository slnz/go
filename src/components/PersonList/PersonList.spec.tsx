import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { User } from 'fluro'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'

import {
  getContactsHandler,
  getContactsHandlerSimple
} from '../../lib/queries/getContacts/getContacts.handlers'
import { getProcessDefinitionsHandler } from '../../lib/queries/getProcessDefinitions/getProcessDefinitions.handlers'
import { useAuth } from '../../lib/useAuth'
import { AuthContextType } from '../../lib/useAuth/useAuth'
import { mswServer } from '../../mocks/mswServer'

import { PersonList } from './PersonList'

jest.mock('../../lib/useAuth', () => ({
  __esModule: true,
  useAuth: jest.fn()
}))

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>

describe('PersonList', () => {
  const user = { contacts: ['userId'] } as unknown as User

  it('shows tabs of contacts with singular and pluralised names', async () => {
    mockUseAuth.mockReturnValue({ user } as unknown as AuthContextType)
    mswServer.use(getProcessDefinitionsHandler())
    mswServer.use(...getContactsHandler())

    const client = new QueryClient()
    render(
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <PersonList search={''} />
        </QueryClientProvider>
      </BrowserRouter>
    )

    expect(screen.getByRole('tab', { name: 'All' })).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByRole('tab', { name: 'Explorers' })).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(
        screen.getByRole('tab', { name: 'New Believer' })
      ).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(
        screen.getByRole('tab', { name: 'Connect Leads' })
      ).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.getByRole('tab', { name: 'Lead' })).toBeInTheDocument()
    })
  })

  it('shows all tab only when one process type', async () => {
    mockUseAuth.mockReturnValue({ user } as unknown as AuthContextType)
    mswServer.use(getProcessDefinitionsHandler())
    mswServer.use(...getContactsHandlerSimple())

    const client = new QueryClient()
    render(
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <PersonList search={''} />
        </QueryClientProvider>
      </BrowserRouter>
    )

    expect(screen.getAllByRole('tab')).toHaveLength(1)
    expect(screen.getByRole('tab', { name: 'All' })).toBeInTheDocument()
  })

  it('displays all contacts assigned to user alphabetically', async () => {
    mockUseAuth.mockReturnValue({ user } as unknown as AuthContextType)
    mswServer.use(getProcessDefinitionsHandler())
    mswServer.use(...getContactsHandler())

    const client = new QueryClient()
    render(
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <PersonList search={''} />
        </QueryClientProvider>
      </BrowserRouter>
    )

    expect(screen.getByRole('tab', { name: 'All' })).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getAllByRole('heading')).toHaveLength(5)
    })
    expect(screen.getAllByRole('heading')[0]).toHaveTextContent('Albert Allen')
    expect(screen.getAllByRole('heading')[1]).toHaveTextContent('Bonnie Blythe')
    expect(screen.getAllByRole('heading')[2]).toHaveTextContent(
      'Caitlin Collins'
    )
    expect(screen.getAllByRole('heading')[3]).toHaveTextContent('Caitlin Kim')
    expect(screen.getAllByRole('heading')[4]).toHaveTextContent('Dexter Dunn')
  })

  it('filters contacts by process type', async () => {
    mockUseAuth.mockReturnValue({ user } as unknown as AuthContextType)
    mswServer.use(getProcessDefinitionsHandler())
    mswServer.use(...getContactsHandler())

    const client = new QueryClient()
    render(
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <PersonList search={''} />
        </QueryClientProvider>
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(
        screen.getByRole('tab', { name: 'New Believer' })
      ).toBeInTheDocument()
    })
    fireEvent.click(screen.getByRole('tab', { name: 'New Believer' }))
    await waitFor(() => {
      expect(screen.getAllByRole('link')).toHaveLength(1)
    })
    expect(screen.getByRole('link')).toHaveTextContent('New Believer')
  })

  it('filters contacts by search value', async () => {
    mockUseAuth.mockReturnValue({ user } as unknown as AuthContextType)
    mswServer.use(getProcessDefinitionsHandler())
    mswServer.use(...getContactsHandler())

    const client = new QueryClient()
    render(
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <PersonList search={'O'} />
        </QueryClientProvider>
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getAllByRole('link')).toHaveLength(2)
    })
    expect(screen.getAllByRole('link')[0]).toHaveTextContent('Bonnie Blythe')
    expect(screen.getAllByRole('link')[1]).toHaveTextContent('Caitlin Collins')
  })
})
