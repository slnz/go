import { fireEvent, render, screen } from '@testing-library/react'

import { FullscreenDialog } from '.'

describe('FullscreenDialog', () => {
  it('renders props', async () => {
    render(
      <FullscreenDialog
        open={true}
        title={'Title'}
        action={<button>OK</button>}
        children={<h1>Form</h1>}
        onClose={jest.fn()}
      />
    )
    expect(await screen.findByText('Title')).toBeInTheDocument()
    expect(
      await screen.findByRole('button', { name: 'OK' })
    ).toBeInTheDocument()
    expect(
      await screen.findByRole('heading', { name: 'Form', level: 1 })
    ).toBeInTheDocument()
  })

  it('calls onClose when dialog closed', async () => {
    const onClose = jest.fn()

    render(
      <FullscreenDialog
        open={true}
        children={<h1>Form</h1>}
        onClose={onClose}
      />
    )
    const closeIconButton = await screen.findByRole('button')
    fireEvent.click(closeIconButton)
    expect(onClose).toHaveBeenCalled()
  })
})
