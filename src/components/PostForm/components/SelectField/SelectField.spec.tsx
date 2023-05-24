import { fireEvent, screen, render } from '@testing-library/react'

import { renderWithProviders } from '../../../../tests/lib/helpers'
import { PostFieldProps } from '../../FieldRenderer'

import { SelectField } from './SelectField'

describe('SelectField', () => {
  const fieldProps: Omit<PostFieldProps, 'onChange' | 'onBlur'> = {
    field: {
      key: 'select',
      title: 'SelectField',
      type: 'string',
      directive: 'select',
      minimum: 0,
      maximum: 1,
      options: [
        { name: 'Approach', value: 'Approach Value' },
        { name: 'Pre-Gospel', value: 'Pre-Gospel Value' },
        { name: 'Gospel', value: 'Gospel Value' }
      ]
    },
    value: ''
  }

  it('should display proper values for single select', async () => {
    renderWithProviders(<SelectField {...fieldProps} />)

    const selectField = await screen.findByRole('button')
    expect(selectField).toBeInTheDocument()
    fireEvent.mouseDown(selectField)

    const option = await screen.findByRole('option', { name: 'Approach' })
    expect(option).toBeInTheDocument()

    fireEvent.click(option)
    expect(
      await screen.findByRole('button', { name: 'Approach' })
    ).toBeInTheDocument()
  })

  it('should toggle on clicking twice for multiple select', async () => {
    renderWithProviders(
      <SelectField
        {...fieldProps}
        field={{ ...fieldProps.field, maximum: 3 }}
      />
    )

    const selectField = await screen.findByRole('button')
    expect(selectField).toBeInTheDocument()
    fireEvent.mouseDown(selectField)

    const option = await screen.findByRole('option', { name: 'Approach' })
    expect(option).toBeInTheDocument()

    fireEvent.click(option)
    const chip = await screen.findByText('Approach Value')

    expect(chip).toBeInTheDocument()

    fireEvent.click(option)
    expect(chip).not.toBeInTheDocument()
  })

  it('should render multiple selected chips at once', async () => {
    renderWithProviders(
      <SelectField
        {...fieldProps}
        field={{ ...fieldProps.field, maximum: 3 }}
      />
    )

    const selectField = await screen.findByRole('button')
    expect(selectField).toBeInTheDocument()
    fireEvent.mouseDown(selectField)

    const optionOne = await screen.findByRole('option', { name: 'Approach' })
    expect(optionOne).toBeInTheDocument()

    const optionTwo = await screen.findByRole('option', { name: 'Pre-Gospel' })
    expect(optionTwo).toBeInTheDocument()

    fireEvent.click(optionOne)
    fireEvent.click(optionTwo)

    expect(await screen.findByText('Approach Value')).toBeInTheDocument()
    expect(await screen.findByText('Pre-Gospel Value')).toBeInTheDocument()
  })
})
