import { IonContent, IonPage } from '@ionic/react'
import { ReactElement } from 'react'
import { useAuth } from '../../lib/auth'
import { Formik } from 'formik'
import * as yup from 'yup'
import {
  Button,
  Container,
  Stack,
  TextField,
  Box,
  Typography
} from '@mui/material'
import { useHistory } from 'react-router'

const validationSchema = yup.object({
  username: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required')
})

export function Login(): ReactElement {
  const { login } = useAuth()
  const history = useHistory()

  return (
    <IonPage>
      <IonContent fullscreen>
        <Formik
          initialValues={{
            username: '',
            password: ''
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, formik) => {
            try {
              await login(values)
              history.push('/')
            } catch (error) {
              if (error instanceof Error)
                formik.setFieldError('username', error.message)
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
            isSubmitting
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <Container maxWidth="sm">
                <Stack spacing={2}>
                  <Box
                    sx={{
                      py: 5,
                      display: 'flex',
                      justifyContent: 'center',
                      '> img': {
                        width: '100px',
                        borderRadius: '10px'
                      }
                    }}
                  >
                    <img src="/assets/go.png" />
                  </Box>
                  <Typography variant="h1" align="center">
                    Sign In
                  </Typography>
                  <Typography align="center">
                    Sign in with your fluro account
                  </Typography>
                  <TextField
                    fullWidth
                    name="username"
                    label="Email"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                  <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Sign In
                  </Button>
                </Stack>
              </Container>
            </form>
          )}
        </Formik>
      </IonContent>
    </IonPage>
  )
}
