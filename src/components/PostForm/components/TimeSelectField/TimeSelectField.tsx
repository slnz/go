import { TextField, TextFieldProps } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import dayjs from 'dayjs'
import { useFormikContext } from 'formik'
import { ReactElement, useState } from 'react'

import type { PostFieldProps } from '../../FieldRenderer'

export function TimeSelectField({
  field,
  error,
  helperText,
  required
}: Omit<PostFieldProps, 'onChange' | 'onBlur'>): ReactElement {
  const formikProps = useFormikContext()
  const [value, setValue] = useState('')
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker
        label={field.title}
        value={value}
        onChange={(time): void => {
          setValue(time != null ? time : '')
          if (formikProps != null) {
            formikProps.setFieldValue('time', dayjs(time).format('LT'))
          }
        }}
        minutesStep={5}
        renderInput={(params: TextFieldProps): ReactElement => {
          return (
            <TextField
              {...params}
              name={field.key}
              required={required}
              helperText={helperText}
              error={error}
            />
          )
        }}
      />
    </LocalizationProvider>
  )
}
