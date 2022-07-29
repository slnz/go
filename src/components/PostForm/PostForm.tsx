import { LoadingButton } from '@mui/lab'
import { Container, Skeleton, Stack, Typography } from '@mui/material'
import { Formik, FormikErrors, FormikTouched } from 'formik'
import { useSnackbar } from 'notistack'
import { ReactElement, useMemo } from 'react'
import {
  AnySchema,
  object,
  string,
  number,
  boolean,
  StringSchema,
  BooleanSchema,
  NumberSchema
} from 'yup'

import { useCreatePost } from '../../lib/mutations/createPost/createPost.hook'
import {
  useDefinitions,
  PostFieldType,
  PostField
} from '../../lib/queries/getDefinitions'
import { PostFieldData } from '../../lib/queries/getPost'
import { PostFormRouteProps } from '../../pages/PostFormPage'

import { SingleInputField } from './components/SingleInputField'

export interface PostFormProps extends PostFormRouteProps {
  onSubmit?: () => void
}

export interface PostFieldProps {
  field: PostField
  values: PostFieldData
  errors: FormikErrors<PostFieldData>
  touched: FormikTouched<PostFieldData>
  handleChange: any
  handleBlur: any
}

export function PostForm({
  personId,
  definitionType,
  onSubmit
}: PostFormProps): ReactElement {
  const { data: definitions, isLoading } = useDefinitions('post')
  const { enqueueSnackbar } = useSnackbar()
  const { mutate } = useCreatePost()

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

  function getSchema(
    type: PostFieldType,
    required: boolean
  ): StringSchema | BooleanSchema | NumberSchema {
    switch (type) {
      case 'string':
      case 'email':
      case 'url':
        return string()
          .when(required + '', (required, schema) =>
            required === 'true' ? schema.required() : schema
          )
          .when(type, (type, schema) =>
            type === 'email' ? schema.email() : schema
          )
          .when(type, (type, schema) =>
            type === 'url' ? schema.url() : schema
          )
      case 'date':
        return string().when(required + '', (required, schema) =>
          required === 'true' ? schema.required() : schema
        )
      case 'boolean':
        return boolean().when(required + '', (required, schema) =>
          required === 'true' ? schema.required() : schema
        )
      case 'number':
      case 'integer':
      case 'float':
        return number().when(required + '', (required, schema) =>
          required === 'true' ? schema.required() : schema
        )
    }
  }

  const { initialValues, validationSchema } = useMemo(() => {
    const values: PostFieldData = {}
    const validation: { [key: string]: AnySchema } = {}

    if (definitions != null) {
      definitions[definitionType].fields.forEach((field) => {
        values[field.key] = getDefaultValue(field.type)
        validation[field.key] = getSchema(
          field.type,
          field.minimum === field.maximum
        )
      })
    }

    return { initialValues: values, validationSchema: object(validation) }
  }, [definitions, definitionType])

  if (definitions != null) {
    console.log('formType', definitions[definitionType])
    // console.log('initialValues', initialValues)
    // console.log('validationSchema', validationSchema)
  }

  function getFieldComponent({
    field,
    ...fieldProps
  }: PostFieldProps): ReactElement {
    switch (field.directive) {
      case 'input':
        return <SingleInputField field={field} {...fieldProps} />
      default:
        return (
          <Typography>
            {field.title} {field.directive}
          </Typography>
        )
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, formik): Promise<void> => {
        console.log('submitted')
        if (values != null) {
          try {
            const response = await mutate({
              parent: personId,
              definition: definitionType,
              data: values,
              realms: []
            })
            console.log('response', response)
          } catch {
            enqueueSnackbar('Failed to update faith step. Please try again!', {
              variant: 'error',
              persist: true
            })
          }
          if (onSubmit) onSubmit()
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
                {!isLoading && definitions != null ? (
                  definitions[definitionType].title
                ) : (
                  <Skeleton />
                )}
              </Typography>
              {!isLoading && definitions != null ? (
                definitions[definitionType].fields.map((field) =>
                  getFieldComponent({
                    field,
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur
                  })
                )
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
