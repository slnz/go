import { LoadingButton } from '@mui/lab'
import { Container, Skeleton, Stack, Typography } from '@mui/material'
import { Formik } from 'formik'
import { useSnackbar } from 'notistack'
import { ReactElement, useMemo } from 'react'
import {
  AnySchema,
  object,
  string,
  number,
  boolean,
  array,
  StringSchema,
  BooleanSchema,
  NumberSchema
} from 'yup'

import { useCreatePost } from '../../lib/mutations/createPost/createPost.hook'
import { useDefinitions, PostFieldType } from '../../lib/queries/getDefinitions'
import { PostFieldData } from '../../lib/queries/getPost'

import { FieldRenderer } from './FieldRenderer'

export interface PostFormProps {
  personId: string
  definitionType: string
  onSubmit?: () => void
}

export function PostForm({
  personId,
  definitionType,
  onSubmit
}: PostFormProps): ReactElement {
  const { data: definitions, isLoading } = useDefinitions('post')
  const { enqueueSnackbar } = useSnackbar()
  const { mutateAsync } = useCreatePost()

  function getDefaultValue(type: PostFieldType): string | number | boolean {
    switch (type) {
      case 'string':
      case 'date':
      case 'email':
      case 'url':
        return ''
      case 'boolean':
        return false
      case 'number':
      case 'integer':
      case 'float':
        return 0
    }
  }

  function getValidationSchema(
    type: PostFieldType,
    maximum: number
  ): StringSchema | BooleanSchema | NumberSchema | AnySchema {
    switch (type) {
      case 'string':
        if (maximum > 1) return array().of(string())
        else return string()
      case 'date':
        return string()
      case 'email':
        return string().email(
          'Please enter email in format: [username]@[domain].[extension]'
        )
      case 'url':
        return string().url(
          'Please enter url in format: [http/https]://[subdomain].[domain].[extension]'
        )
      case 'boolean':
        return boolean()
      case 'number':
      case 'integer':
      case 'float':
        // Need to return a custom error message.
        // Max is largest number we can store in 4 bytes of space
        return number().max(4294967295, 'Please enter a number only')
    }
  }

  const { initialValues, validationSchema } = useMemo(() => {
    const values: PostFieldData = {}
    const validation: { [key: string]: AnySchema } = {}

    if (definitions != null) {
      definitions[definitionType].fields.forEach((field) => {
        values[field.key] = getDefaultValue(field.type)
        const schema = getValidationSchema(field.type, field.maximum)
        validation[field.key] =
          field.minimum > 0
            ? schema.required('Please fill in this field')
            : schema
      })
    }

    return { initialValues: values, validationSchema: object(validation) }
  }, [definitions, definitionType])

  // if (definitions != null) {
  // console.log('formType', definitions[definitionType])
  // console.log('initialValues', initialValues)
  // console.log('validationSchema', validationSchema)
  // }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values): Promise<void> => {
        if (values != null) {
          try {
            await mutateAsync({
              parent: personId,
              definition: definitionType,
              data: values,
              realms: []
            })

            onSubmit?.()
          } catch (error) {
            if (error instanceof Error) {
              enqueueSnackbar(error.message, { variant: 'error' })
            }
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
              <Typography variant="h4" gutterBottom sx={{ flexGrow: 1 }}>
                {!isLoading && definitions != null ? (
                  definitions[definitionType].title
                ) : (
                  <Skeleton />
                )}
              </Typography>
              {!isLoading && definitions != null ? (
                definitions[definitionType].fields.map((field) => (
                  <FieldRenderer
                    key={field.key}
                    field={field}
                    values={values}
                    errors={errors}
                    touched={touched}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                ))
              ) : (
                <Skeleton />
              )}
              <LoadingButton
                size="large"
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                loading={isSubmitting}
                disabled={!isValid}
              >
                Submit
              </LoadingButton>
            </Stack>
          </Container>
        </form>
      )}
    </Formik>
  )
}
