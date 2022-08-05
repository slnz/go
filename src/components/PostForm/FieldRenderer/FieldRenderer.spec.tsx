import { screen } from '@testing-library/react'

import { PostField } from '../../../lib/queries/getDefinitions'
import { renderWithProviders } from '../../../tests/lib/helpers'

import { FieldRendererProps } from './FieldRenderer'

import { FieldRenderer } from '.'

describe('FieldRenderer', () => {
  const props: FieldRendererProps = {
    field: {
      key: 'input',
      title: 'InputTitle',
      type: 'string',
      directive: 'input',
      minimum: 0,
      maximum: 1,
      description: 'helper text'
    },
    values: { input: 'default value' },
    errors: {},
    touched: {},
    onChange: jest.fn(),
    onBlur: jest.fn()
  }

  it('passes value to rendered components', async () => {
    renderWithProviders(<FieldRenderer {...props} />)

    expect(
      await screen.findByRole('textbox', { name: 'InputTitle' })
    ).toHaveValue('default value')
  })

  it('passes helperText to rendered components', async () => {
    renderWithProviders(<FieldRenderer {...props} touched={{ input: false }} />)

    expect(
      await screen.findByRole('textbox', { name: 'InputTitle' })
    ).toHaveAccessibleDescription('helper text')
  })

  it('passes error to rendered components', async () => {
    renderWithProviders(
      <FieldRenderer
        {...props}
        errors={{ input: 'error' }}
        touched={{ input: true }}
      />
    )

    expect(
      await screen.findByRole('textbox', { name: 'InputTitle' })
    ).toHaveAccessibleDescription('error')
  })

  it('passes required check to rendered components', async () => {
    renderWithProviders(
      <FieldRenderer {...props} field={{ ...props.field, minimum: 1 }} />
    )

    expect(
      await screen.findByRole('textbox', { name: 'InputTitle' })
    ).toBeRequired()
  })

  it('displays text label of component by default', async () => {
    const field: PostField = { ...props.field, directive: 'custom' }
    renderWithProviders(<FieldRenderer {...props} field={field} />)

    expect(
      await screen.findByText(`${field.title} ${field.directive}`)
    ).toBeInTheDocument()
  })
})
