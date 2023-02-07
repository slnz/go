import { render, screen } from '@testing-library/react'
import { noop } from 'lodash'

import { PostFieldProps } from '../../FieldRenderer'

import { DateSelectField } from '.'

describe('SingleInputField', () => {
  const fieldProps: Omit<PostFieldProps, 'onChange' | 'onBlur'> = {
    field: {
      key: 'DateKey',
      title: 'DateTitle',
      type: 'date',
      directive: 'date-select',
      minimum: 0,
      maximum: 1
    },
    value: 'default value'
  }
})
