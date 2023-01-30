import { userEvent } from '@storybook/testing-library'
import { render, screen } from '@testing-library/react'
import { noop } from 'lodash'

import { PostFieldProps } from '../../FieldRenderer'

import { TextArea } from '.'

describe('TextArea', () => {
  const fieldProps: Omit<PostFieldProps, 'onChange' | 'onBlur'> = {
    field: {
      key: 'textareaString',
      title: 'Text Area',
      type: 'string',
      directive: 'textarea',
      minimum: 0,
      maximum: 1
    },
    value: 'default value'
  }

  it('should render all elements properly', () => {
    render(<TextArea {...fieldProps} onChange={noop} onBlur={noop} />)
    expect(screen.getByTestId('text area')).toHaveTextContent('Text Area')
  })

  it('should call onChange upon user type', async () => {
    const onChange = jest.fn()
    render(<TextArea {...fieldProps} onChange={onChange} onBlur={noop} />)
    const field = screen.getByTestId('text area input')
    expect(field).toBeInTheDocument()
    userEvent.type(field, 'tenletters')
    expect(onChange).toHaveBeenCalledTimes(10)
  })
})
