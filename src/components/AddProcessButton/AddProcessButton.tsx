import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { LoadingButton } from '@mui/lab'
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Slide,
  Toolbar,
  Typography
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { useQueryClient } from '@tanstack/react-query'
import { Form, Formik } from 'formik'
import { values as lodashValues } from 'lodash'
import { useSnackbar } from 'notistack'
import { forwardRef, ReactElement, Ref, useState } from 'react'
import { useHistory } from 'react-router'
import { object, string, array } from 'yup'

import { useCreateContent } from '../../lib/mutations/createContent/createContent.hook'
import { useDefinitions } from '../../lib/queries/getDefinitions'
import { useAuth } from '../../lib/useAuth'
import { RealmSelect } from '../RealmSelect'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const validationSchema = object({
  realmIds: array()
    .of(string().required())
    .min(1, 'Realm is required')
    .required('Realm are required'),
  definitionName: string().required('Process is required')
})

export interface AddProcessButtonProps {
  /** add the item with id to the selected process */
  itemId: string
  /** only show processes that receive this type e.g `contact` or any */
  itemType: string
  /** called when the item has been added to the process successfully */
  onSuccess?: () => void
}

export function AddProcessButton({
  onSuccess,
  itemId,
  itemType
}: AddProcessButtonProps): ReactElement {
  const { data, isLoading } = useDefinitions('process')
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)
  const { mutateAsync } = useCreateContent()
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const history = useHistory()

  function handleClose(): void {
    setOpen(false)
  }

  const handleOpen = (): void => setOpen(true)

  return (
    <>
      <Button onClick={handleOpen} startIcon={<AddIcon />}>
        Add Process
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Formik
          initialValues={{
            realmIds: [] as string[],
            definitionName: ''
          }}
          validationSchema={validationSchema}
          onSubmit={async (values): Promise<void> => {
            if (user == null) return

            try {
              const response = await mutateAsync({
                definition: values.definitionName,
                _type: 'process',
                item: { _id: itemId, type: itemType },
                assignedTo: [{ _id: user._id }],
                realms: values.realmIds.map((_id) => ({ _id })),
                title: itemId
              })
              history.push(`/processes/${response._id}`)
              console.log([itemType, itemId])
              queryClient.invalidateQueries([itemType, itemId])
              setOpen(false)
            } catch (error) {
              if (error instanceof Error) {
                enqueueSnackbar(error.message, { variant: 'error' })
              }
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            isSubmitting,
            isValid,
            setFieldValue,
            setFieldTouched
          }): ReactElement => (
            <Box
              component={Form}
              sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography
                    sx={{ ml: 2, flex: 1 }}
                    variant="h6"
                    component="div"
                  >
                    Add To Process
                  </Typography>
                  <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!isValid}
                    loading={isSubmitting}
                  >
                    Select
                  </LoadingButton>
                </Toolbar>
              </AppBar>
              <Box p={2}>
                <RealmSelect
                  params={{ parentType: 'process' }}
                  onChange={(ids): void => setFieldValue('realmIds', ids)}
                  onBlur={(): void => {
                    setFieldTouched('realmIds')
                  }}
                  value={values.realmIds}
                  error={touched.realmIds && Boolean(errors.realmIds)}
                  helperText={touched.realmIds && errors.realmIds}
                />
              </Box>
              <Divider />
              <Box flexGrow={1} overflow="auto">
                <List sx={{ pt: 0 }}>
                  {data != null &&
                    lodashValues(data)
                      .filter(({ data }) =>
                        data.processTypes != null
                          ? data.processTypes?.includes(itemType)
                          : true
                      )
                      .map((process) => (
                        <ListItemButton
                          key={process.definitionName}
                          selected={
                            values.definitionName === process.definitionName
                          }
                          onClick={(): void =>
                            setFieldValue(
                              'definitionName',
                              process.definitionName
                            )
                          }
                        >
                          {values?.definitionName ===
                            process.definitionName && (
                            <ListItemIcon>
                              <CheckIcon />
                            </ListItemIcon>
                          )}
                          <ListItemText
                            inset={
                              values?.definitionName !== process.definitionName
                            }
                          >
                            {process.title}
                          </ListItemText>
                        </ListItemButton>
                      ))}
                  {isLoading &&
                    [0, 1, 2, 3].map((value) => (
                      <ListItemButton key={value} disabled>
                        <ListItemText
                          inset
                          primary={<Skeleton width={210} />}
                        />
                      </ListItemButton>
                    ))}
                </List>
              </Box>
            </Box>
          )}
        </Formik>
      </Dialog>
    </>
  )
}
