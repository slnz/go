import { LoadingButton } from '@mui/lab'
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { Formik } from 'formik'
import { ReactElement } from 'react'
import { object, string } from 'yup'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = object({
  firstName: string().required('First Name is required'),
  lastName: string().required('Last Name is required'),
  phone: string()
    .min(9, 'Phone number is not valid')
    .required('Phone number is required')
    .matches(phoneRegExp, 'Phone number is not valid'),
  email: string().email('Enter a valid email').required('Email is required'),
  process: string().required('You must select a process')
})

// const getProcessList = async () => {
//   try {
//     const response = await client.api.post(`/content/definition/filter`, {
//       filter: {
//         operator: 'and',
//         filters: [
//           {
//             operator: 'and',
//             filters: [
//               {
//                 comparator: '==',
//                 key: 'parentType',
//                 value: 'process'
//               }
//             ]
//           }
//         ]
//       },
//       select: ['definitionName']
//     })

//     return response.data
//   } catch (error) {
//     console.log(error)
//   }
// }

const addContact = (values: any): any => {
  console.log('hello')
}

export function AddContact(): ReactElement {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        gender: '',
        phone: '',
        email: '',
        process: ''
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, formik): Promise<void> => {
        try {
          await addContact(values)
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
        isValid
        /* and other goodies */
      }): ReactElement => (
        <form onSubmit={handleSubmit}>
          <Container maxWidth="sm">
            <Stack spacing={2}>
              <Typography variant="h2">Add Contact</Typography>
              <Typography>Fill in the details to add a contact</Typography>
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
                      <InputLabel id="gender-label">Gender</InputLabel>
                      <Select
                        labelId="gender-label"
                        data-testid="gender"
                        label="Gender"
                        name="gender"
                        value={values.gender}
                        onChange={handleChange}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="unknown">Unknown</MenuItem>
                      </Select>
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
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="process-label">Process</InputLabel>
                  <Select
                    labelId="process-label"
                    label="Process"
                    name="process"
                    value={values.process}
                    onChange={handleChange}
                    error={touched.process && Boolean(errors.process)}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
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
                Add Contact
              </LoadingButton>
            </Stack>
          </Container>
        </form>
      )}
    </Formik>
  )
}
