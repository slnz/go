import { LoadingButton } from '@mui/lab'
import { Container, Stack, TextField, Typography } from '@mui/material'
import { Formik } from 'formik'
import { get } from 'lodash'
import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import { object, string } from 'yup'

import { client } from '../../lib/fluro'

const validationSchema = object({
  username: string().email('Enter a valid email').required('Email is required')
})

export function ForgotPassword(): ReactElement {
  const history = useHistory()

  return (
    <Formik
      initialValues={{
        username: ''
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, formik): Promise<void> => {
        try {
          await client.auth.sendResetPasswordRequest(values)
          history.goBack()
        } catch (error) {
          const errorMessage = get(error, 'response.data.error')
          if (errorMessage != null) {
            formik.setFieldError('username', errorMessage)
          } else {
            formik.setFieldError('username', client.utils.errorMessage(error))
          }
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid
      }): ReactElement => (
        <form onSubmit={handleSubmit}>
          <Container maxWidth="sm" sx={{ py: 2 }}>
            <Stack spacing={2}>
              <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                Reset Password
              </Typography>
              <Typography>
                Enter the email associated with your account and we'll ask fluro
                to send an email with instructions to reset your password.
              </Typography>
              <TextField
                fullWidth
                name="username"
                label="Email Address"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
              <LoadingButton
                size="large"
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                loading={isSubmitting}
                disabled={!isValid}
              >
                Send Instructions
              </LoadingButton>
            </Stack>
          </Container>
        </form>
      )}
    </Formik>
  )
}
