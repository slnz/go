import { render, screen } from '@testing-library/react'
import { noop } from 'lodash'

import { PostFieldProps } from '../../FieldRenderer'

import { DateSelectField } from '.'

describe('SingleInputField', () => {
  const fieldProps: Omit<PostFieldProps, 'onChange' | 'onBlur'> = {
    field: {
      key: 'date-selectDate',
      title: 'Date',
      type: 'date',
      directive: 'date-select',
      minimum: 0,
      maximum: 1
    },
    value: 'default value'
  }

  it('renders all elements properly', async () => {
    render(<DateSelectField {...fieldProps} onChange={noop} onBlur={noop} />)
    expect(screen.getByTestId('date select')).toHaveTextContent('Date')
  })
})
