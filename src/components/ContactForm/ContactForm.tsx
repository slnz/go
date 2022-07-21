import { LoadingButton } from '@mui/lab'
import {
  Box,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Stack,
  TextField
} from '@mui/material'
import { Formik } from 'formik'
import { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { Asserts, object, string } from 'yup'

import { getProcessDefinitions } from '../../lib/queries/getProcessDefinitions'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = object({
  firstName: string().required('First Name is required'),
  lastName: string(),
  gender: string().required('Gender is required'),
  phone: string()
    .test({
      test: function (value) {
        const { email } = this.parent
        if (!email) return value != null
        return true
      },
      message: 'Phone or email is required'
    })
    .min(9, 'Phone number is not valid')
    .matches(phoneRegExp, 'Phone number is not valid'),
  email: string()
    .test({
      test: function (value) {
        const { phone } = this.parent
        if (!phone) return value != null
        return true
      },
      message: 'Email or phone is required'
    })
    .email('Enter a valid email')
})

type Contact = Asserts<typeof validationSchema>

export interface ContactFormProps {
  contact?: Contact
  onSubmit: (contact: Contact) => void
  submitLabel?: string
}

export function ContactForm({
  contact,
  onSubmit,
  submitLabel
}: ContactFormProps): ReactElement {
  const { data: processDefinition } = useQuery(
    ['definitions', { type: 'process' }],
    getProcessDefinitions
  )

  if (processDefinition != null) {
    console.log(processDefinition)
  }
  return (
    <Formik
      initialValues={
        contact ?? {
          firstName: '',
          lastName: '',
          gender: '',
          phone: '',
          email: ''
        }
      }
      validationSchema={validationSchema}
      onSubmit={async (values): Promise<void> => {
        try {
          await onSubmit?.(values)
        } catch (error) {
          console.log(error)
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
        isValid,
        setFieldValue
      }): ReactElement => (
        <form onSubmit={handleSubmit}>
          <Container maxWidth="sm" sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="firstName"
                      label="First Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="lastName"
                      label="Last Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        select
                        name="gender"
                        label="Gender"
                        onChange={(event): void =>
                          setFieldValue('gender', event.target.value)
                        }
                        onBlur={handleBlur}
                        value={values.gender}
                        error={touched.gender && Boolean(errors.gender)}
                        helperText={touched.gender && errors.gender}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="unknown">Unknown</MenuItem>
                      </TextField>
                    </FormControl>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      type="text"
                      name="phone"
                      label="Phone Number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                  </Grid>
                </Grid>
              </Box>
              <TextField
                fullWidth
                type="email"
                name="email"
                label="Email Address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
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
                {submitLabel ?? 'Save'}
              </LoadingButton>
            </Stack>
          </Container>
        </form>
      )}
    </Formik>
  )
}
