import { ReactElement, useState } from 'react'
import { useAuth } from '../../lib/useAuth'
import { Formik } from 'formik'
import * as yup from 'yup'
import {
  Container,
  Stack,
  TextField,
  Box,
  Typography,
  Button,
  InputAdornment,
  IconButton
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Link } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const validationSchema = yup.object({
  username: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required')
})

export function Login(): ReactElement {
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, formik) => {
        try {
          await login(values)
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
        isSubmitting,
        isValid
      }) => (
        <form onSubmit={handleSubmit}>
          <Container maxWidth="sm">
            <Stack spacing={2}>
              <Box
                sx={{
                  pt: 5,
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
              <Typography variant="h2">Login</Typography>
              <Typography>Sign in with your fluro account</Typography>
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
              <Box>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Box display="flex" justifyContent="flex-end">
                  <Button component={Link} to="/forgot-password">
                    Forgot Password?
                  </Button>
                </Box>
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
                Login
              </LoadingButton>
            </Stack>
          </Container>
        </form>
      )}
    </Formik>
  )
}
