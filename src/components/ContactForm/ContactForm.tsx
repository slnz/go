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
import { array, Asserts, object, string } from 'yup'

import { RealmSelect } from '../RealmSelect'

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
    .min(9, 'Phone number is too short')
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
    .email('Enter a valid email'),
  realms: array()
    .of(string().required())
    .min(1, 'Realm is required')
    .required('Realm is required')
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
  return (
    <Formik
      initialValues={
        contact ?? {
          firstName: '',
          lastName: '',
          gender: '',
          phone: '',
          email: '',
          realms: []
        }
      }
      validationSchema={validationSchema}
      onSubmit={async (values, formik): Promise<void> => {
        try {
          await onSubmit?.(values)
        } catch (error) {
          if (error instanceof Error) {
            formik.setFieldError('firstName', error.message)
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
        isValid,
        setFieldValue,
        setFieldTouched
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
                  <Grid item xs={5}>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        select
                        name="gender"
                        data-testid="gender"
                        label="Gender"
                        id="gender"
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
                  <Grid item xs={7}>
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
              <Box>
                <RealmSelect
                  value={values.realms}
                  onChange={(value): void => {
                    setFieldValue('realms', value)
                  }}
                  onBlur={(): void => {
                    setFieldTouched('realms')
                  }}
                  error={touched.realms && Boolean(errors.realms)}
                  helperText={touched.realms && errors.realms}
                />
              </Box>

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
