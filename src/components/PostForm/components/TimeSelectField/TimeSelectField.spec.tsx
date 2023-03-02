import { userEvent } from '@storybook/testing-library'
import { fireEvent, render, screen } from '@testing-library/react'

import { PostFieldProps } from '../../FieldRenderer'

import { TimeSelectField } from '.'

describe('TimeSelectField', () => {
  const fieldProps: Omit<PostFieldProps, 'onChange' | 'onBlur'> = {
    field: {
      key: 'timeKey',
      title: 'timeTitle',
      type: 'string',
      directive: 'time-select',
      minimum: 0,
      maximum: 1
    },
    value: 'default value'
  }

  it('should render picker correctly', () => {
    render(<TimeSelectField {...fieldProps} />)
    expect(screen.getByLabelText('Choose time')).toBeInTheDocument()
  })

  it('should show time based on typed input', () => {
    render(<TimeSelectField {...fieldProps} />)

    const inputField = screen.getByLabelText('Choose time')

    fireEvent.click(inputField)
    fireEvent.click(screen.getByTestId('PenIcon'))

    const dialogField = screen.getByRole('textbox', { name: 'timeTitle' })

    fireEvent.click(dialogField)
    userEvent.type(dialogField, '0835P')
    expect(dialogField).toHaveValue('08:35 PM')
    userEvent.type(dialogField, 'A')
    expect(dialogField).toHaveValue('08:35 AM')

    fireEvent.click(screen.getByRole('button', { name: 'OK' }))
    expect(inputField).toHaveValue('08:35 AM')
  })
})
