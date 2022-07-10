import { fireEvent, render, screen } from '@testing-library/react'
import { User } from 'fluro'

import { useAuth } from '../../lib/useAuth'
import { AuthContextType } from '../../lib/useAuth/useAuth'

import { PeopleMenuBar } from './PeopleMenuBar'

jest.mock('../../lib/useAuth', () => ({
  __esModule: true,
  useAuth: jest.fn()
}))

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>

describe('PeopleMenuBar', () => {
  const user = {
    name: 'Robert Stevens',
    firstName: 'Robert',
    _id: 'userId'
  } as unknown as User
  it('displays avatar', () => {
    mockUseAuth.mockReturnValueOnce({ user } as unknown as AuthContextType)
    render(<PeopleMenuBar />)
    const avatarEl = screen.getByAltText('Robert Stevens')
    expect(avatarEl).toHaveAttribute(
      'src',
      'https://api.fluro.io/get/avatar/user/userId?w=32&h=32'
    )
  })

  it('calls onChange', () => {
    mockUseAuth.mockReturnValueOnce({ user } as unknown as AuthContextType)
    const onChange = jest.fn()
    render(<PeopleMenuBar onChange={onChange} />)
    fireEvent.change(screen.getByRole('textbox', { name: 'Search' }), {
      target: { value: 'search string' }
    })
    expect(onChange).toHaveBeenCalledWith('search string')
  })

  it('calls logout', () => {
    const logout = jest.fn()
    mockUseAuth.mockReturnValue({
      user,
      logout
    } as unknown as AuthContextType)
    render(<PeopleMenuBar />)
    fireEvent.click(screen.getByRole('button', { name: 'Menu' }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Logout' }))
    expect(logout).toHaveBeenCalled()
  })
})
