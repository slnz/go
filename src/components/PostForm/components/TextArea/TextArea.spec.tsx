import { fireEvent, render, screen } from '@testing-library/react'

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
    const noop = jest.fn()
    render(<TextArea {...fieldProps} onChange={noop} onBlur={noop} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should call onChange and onBlur properly', async () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    render(<TextArea {...fieldProps} onChange={onChange} onBlur={onBlur} />)
    const field = screen.getByText('default value')
    expect(field).toBeInTheDocument()
    fireEvent.click(field)
    fireEvent.change(field, {
      target: { value: 'changed' }
    })
    expect(onChange).toHaveBeenCalled()
    fireEvent.blur(field)
    expect(onBlur).toHaveBeenCalled()
  })
})
