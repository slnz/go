import { fireEvent, screen } from '@testing-library/react'

import { getPostDefinitionsHandler } from '../../../../lib/queries/getDefinitions/getDefinitions.handlers'
import { mswServer } from '../../../../mocks/mswServer'
import { renderWithProviders } from '../../../../tests/lib/helpers'
import { PostFieldProps } from '../../FieldRenderer'

import { SingleInputField } from '.'

describe('SingleInputField', () => {
  const fieldProps: Omit<PostFieldProps, 'onChange' | 'onBlur'> = {
    field: {
      key: 'input',
      title: 'InputTitle',
      type: 'string',
      directive: 'input',
      minimum: 0,
      maximum: 1,
      placeholder: 'placeholder value'
    },
    value: 'default value'
  }

  it('displays textfield as default', async () => {
    mswServer.use(getPostDefinitionsHandler())
    const onChange = jest.fn()
    const onBlur = jest.fn()
    renderWithProviders(
      <SingleInputField {...fieldProps} onChange={onChange} onBlur={onBlur} />
    )

    const textField = await screen.findByRole('textbox', { name: 'InputTitle' })

    expect(textField).toBeInTheDocument()
    expect(textField).toHaveValue('default value')
    expect(textField).toHaveAttribute('placeholder', 'placeholder value')
    fireEvent.click(textField)
    fireEvent.change(textField, {
      target: { value: 'changed' }
    })
    expect(onChange).toHaveBeenCalled()
    fireEvent.blur(textField)
    expect(onBlur).toHaveBeenCalled()
  })

  it('displays checkbox if boolean field type', async () => {
    mswServer.use(getPostDefinitionsHandler())
    const onChange = jest.fn()
    const onBlur = jest.fn()
    renderWithProviders(
      <SingleInputField
        {...fieldProps}
        field={{ ...fieldProps.field, type: 'boolean' }}
        value={undefined}
        onChange={onChange}
        onBlur={onBlur}
      />
    )

    const checkbox = await screen.findByRole('checkbox')

    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
    fireEvent.click(checkbox)
    expect(onChange).toHaveBeenCalled()
    expect(checkbox).toBeChecked()
    fireEvent.blur(checkbox)
    expect(onBlur).toHaveBeenCalled()
  })
})
