import { userEvent } from '@storybook/testing-library'
import { fireEvent, render, screen } from '@testing-library/react'
import dayjs from 'dayjs'

import { PostFieldProps } from '../../FieldRenderer'

import { DateSelectField } from '.'

describe('DateSelectField', () => {
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

  const currentDate = dayjs().format('MMMM YYYY')
  const currentDateFormat = dayjs().format('DD/MM/YYYY')
  const currentDateTyped = dayjs().format('DDMMYYYY')

  it('should render picker correctly', () => {
    render(<DateSelectField {...fieldProps} />)
    expect(screen.getByLabelText('Choose date')).toBeInTheDocument()
  })

  it('should show date based on selection', () => {
    render(<DateSelectField {...fieldProps} />)
    const inputField = screen.getByLabelText('Choose date')
    expect(screen.queryByText(currentDate)).not.toBeInTheDocument()
    fireEvent.click(inputField)
    expect(screen.getByText(currentDate)).toBeInTheDocument()
    fireEvent.click(screen.getByText(dayjs().format('D')), { role: 'gridcell' })
    expect(inputField).toHaveValue(currentDateFormat)
  })

  it('should show date based on typed input', () => {
    render(<DateSelectField {...fieldProps} />)
    const inputField = screen.getByLabelText('Choose date')
    fireEvent.click(inputField)
    fireEvent.click(screen.getByTestId('PenIcon'))
    const dialogField = screen.getByPlaceholderText('dd/mm/yyyy')
    fireEvent.click(dialogField)
    userEvent.type(dialogField, currentDateTyped)
    expect(dialogField).toHaveValue(currentDateFormat)
  })
})
