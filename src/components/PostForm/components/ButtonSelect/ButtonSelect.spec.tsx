import { fireEvent, screen } from '@testing-library/react'

import { getPostDefinitionsHandler } from '../../../../lib/queries/getDefinitions/getDefinitions.handlers'
import { mswServer } from '../../../../mocks/mswServer'
import { renderWithProviders } from '../../../../tests/lib/helpers'
import { PostFieldProps } from '../../FieldRenderer'

import { ButtonSelect } from './ButtonSelect'

describe('ButtonSelect', () => {
  const fieldProps: Omit<PostFieldProps, 'onChange' | 'onBlur'> = {
    field: {
      key: 'button-select',
      title: 'ButtonSelect',
      type: 'string',
      directive: 'button-select',
      minimum: 0,
      maximum: 1,
      options: [
        { name: 'Approach', value: 'Approach' },
        { name: 'Pre-Gospel', value: 'Pre-Gospel' },
        { name: 'Gospel', value: 'Gospel' }
      ]
    },
    value: ''
  }

  it('should render radio button for single select', async () => {
    mswServer.use(getPostDefinitionsHandler())
    const onChange = jest.fn()
    renderWithProviders(<ButtonSelect {...fieldProps} onChange={onChange} />)

    const radioButton = await screen.findByRole('radio', { name: 'Approach' })

    expect(radioButton).toBeInTheDocument()
    fireEvent.click(radioButton)
    expect(onChange).toHaveBeenCalled()
    expect(radioButton).toBeChecked()
  })

  it('should render checkbox group for multi select', async () => {
    mswServer.use(getPostDefinitionsHandler())
    const onChange = jest.fn()
    renderWithProviders(
      <ButtonSelect
        {...fieldProps}
        field={{ ...fieldProps.field, maximum: 2 }}
        onChange={onChange}
      />
    )

    const checkbox = await screen.findByRole('checkbox', { name: 'Approach' })
    expect(checkbox).toBeInTheDocument()
    fireEvent.click(checkbox)
    expect(onChange).toHaveBeenCalled()
    expect(checkbox).toBeChecked()
  })
})
