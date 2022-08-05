import { fireEvent, screen, waitFor } from '@testing-library/react'

import { createPostHandler } from '../../lib/mutations/createPost/createPost.handlers'
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

  it('validates required fields', async () => {
    mswServer.use(getPostDefinitionsHandler(), createPostHandler())
    renderWithProviders(
      <PostForm personId="personId" definitionType="appointment" />
    )

    fireEvent.click(await screen.findByRole('button', { name: 'Submit' }))
    fireEvent.blur(await screen.findByRole('textbox', { name: 'Location' }))

    await waitFor(async () =>
      expect(
        await screen.findByRole('textbox', { name: 'Location' })
      ).toHaveAccessibleDescription('Please fill in this field')
    )
  })

  it('validates number fields', async () => {
    mswServer.use(getPostDefinitionsHandler(), createPostHandler())
    renderWithProviders(
      <PostForm personId="personId" definitionType="appointment" />
    )

    // https://www.w3.org/TR/html-aria/#docconformance input type=number is spinbutton
    fireEvent.change(await screen.findByRole('spinbutton'), {
      target: { value: 4294967296 }
    })
    fireEvent.click(await screen.findByRole('button', { name: 'Submit' }))

    await waitFor(async () =>
      expect(await screen.findByRole('spinbutton')).toHaveAccessibleDescription(
        'Please enter a number only'
      )
    )
  })

  it('validates email fields', async () => {
    mswServer.use(getPostDefinitionsHandler(), createPostHandler())
    renderWithProviders(
      <PostForm personId="personId" definitionType="appointment" />
    )

    fireEvent.change(await screen.findByRole('textbox', { name: 'Email' }), {
      target: { value: 'Not an email' }
    })
    fireEvent.click(await screen.findByRole('button', { name: 'Submit' }))

    await waitFor(async () =>
      expect(
        await screen.findByRole('textbox', { name: 'Email' })
      ).toHaveAccessibleDescription(
        'Please enter email in format: [username]@[domain].[extension]'
      )
    )
  })

  it('validates url fields', async () => {
    mswServer.use(getPostDefinitionsHandler(), createPostHandler())
    renderWithProviders(
      <PostForm personId="personId" definitionType="appointment" />
    )

    fireEvent.change(await screen.findByRole('textbox', { name: 'Link' }), {
      target: { value: 'Not a link' }
    })
    fireEvent.click(await screen.findByRole('button', { name: 'Submit' }))

    await waitFor(async () =>
      expect(
        await screen.findByRole('textbox', { name: 'Link' })
      ).toHaveAccessibleDescription(
        'Please enter url in format: [http/https]://[subdomain].[domain].[extension]'
      )
    )
  })

  it('calls onSubmit on submit button click', async () => {
    const onSubmit = jest.fn()
    mswServer.use(getPostDefinitionsHandler(), createPostHandler())
    renderWithProviders(
      <PostForm
        personId="personId"
        definitionType="appointment"
        onSubmit={onSubmit}
      />
    )
    fireEvent.change(await screen.findByRole('textbox', { name: 'Location' }), {
      target: { value: 'Library' }
    })
    const submitButton = await screen.findByRole('button', { name: 'Submit' })
    fireEvent.click(submitButton)
    await waitFor(() => expect(onSubmit).toHaveBeenCalled())
  })
})
