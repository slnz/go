import { fireEvent, screen } from '@testing-library/react'

import { getPostDefinitionsHandler } from '../../lib/queries/getDefinitions/getDefinitions.handlers'
import { mswServer } from '../../mocks/mswServer'
import { renderWithProviders } from '../../tests/lib/helpers'

import { PostForm } from '.'

describe('PostForm', () => {
  it('displays post form for definition type', async () => {
    mswServer.use(getPostDefinitionsHandler())
    renderWithProviders(
      <PostForm personId="personId" definitionType="appointment" />
    )

    expect(
      await screen.findByRole('heading', { name: 'Appointment' })
    ).toBeInTheDocument()
  })

  it('calls onSubmit on submit button click', async () => {
    const onSubmit = jest.fn()
    mswServer.use(getPostDefinitionsHandler())
    renderWithProviders(
      <PostForm
        personId="personId"
        definitionType="appointment"
        onSubmit={onSubmit}
      />
    )

    const submitButton = await screen.findByRole('button', { name: 'Submit' })
    fireEvent.click(submitButton)
    expect(onSubmit).toHaveBeenCalled()
  })
})
