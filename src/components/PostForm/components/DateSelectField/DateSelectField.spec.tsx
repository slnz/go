import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { noop } from 'lodash'

import { PostFieldProps } from '../../FieldRenderer'

import { DateSelectField } from '.'

describe('SingleInputField', () => {
  const fieldProps: Omit<PostFieldProps, 'onChange' | 'onBlur'> = {
    field: {
      key: 'date',
      title: 'Date',
      type: 'date',
      directive: 'date-select',
      minimum: 0,
      maximum: 1
    },
    value: 'default value'
  }

  it('calls onblur and onchange properly', async () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    render(
      <DateSelectField {...fieldProps} onChange={onChange} onBlur={onBlur} />
    )
    const dateSelectField = screen.getByTestId('date select')
  })
})
